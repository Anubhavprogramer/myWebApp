import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Color from '../constants/Color'
import Shared from '../Shared/SharedData'
import { useUser } from '@clerk/clerk-expo';

export default function MarkFav({pet}) {
  const {user} = useUser();
  const [favList, setFavList] = useState();

    useEffect(()=>{
        user&&GetFav()
    },[user])

    const GetFav = async () => {
        const result = await Shared.GetFavList(user);
        setFavList(result.favList ? result.favList : []); // Ensure the field name matches the one used in GetFavList
    };

    const AddToFav = async () => {
        const newFavList = [...favList, pet.id];
        await Shared.UpdateFavList(user, newFavList);
        setFavList(newFavList); // Update the state immediately
    };

    const removeFav = async () => {
      const favResult = favList.filter((item) => item !== pet.id);
      await Shared.UpdateFavList(user, favResult);
        setFavList(favResult);

    }

  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={() => removeFav()}>
          <Ionicons name="heart" size={24} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={() => AddToFav()}>
          <Ionicons name="heart-outline" size={24} color={Color.primary} />
        </Pressable>
      )}
    </View>
  )
}