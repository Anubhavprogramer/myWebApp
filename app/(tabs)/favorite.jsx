import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import SharedData from '../../Shared/SharedData'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import PetListItem from '../../components/Home/PetListItem';

export default function Favorite() {
  const [favListid, setFavListid] = useState([]);
  const [favListData, setFavListData] = useState([]);
  const [loader, setLoader] = useState(true);
  const {user} = useUser();
  
  const GetfavpetIds = async () => {
    setLoader(true);
    const result = await SharedData.GetFavList(user);
    // console.log(result);
    setFavListid(result?.favList || []);
    setLoader(false);
  }

  // to collect data
  const GetfavPetdata = async () =>{
    setLoader(true);
    if (favListid.length === 0) {
      setLoader(false); // set loader to false before returning
      return;
    }
    const q = query(collection(db, "Pets"),where("id", "in", favListid));
    const querySnapshot = await getDocs(q);
    const petsData = [];
    querySnapshot.forEach((doc) => {
      petsData.push(doc.data());
    });
    setFavListData(petsData);
    setLoader(false);
  }

  useEffect(() => {
    user && GetfavpetIds();
  }, [user]);

  useEffect(() => {
    GetfavPetdata();
  }, [favListid]);

  return (
    <View style={{
      padding: 10,
      marginTop: 20,
    }}>
      <Text style={{
        fontFamily: 'lexend-ExtraBold',
        fontSize: 30,
      }}>Favorite</Text>

      {favListid.length > 0 ? (
        <FlatList
          data={favListData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          onRefresh={GetfavpetIds}
          refreshing={loader}
          style={{
            marginTop: 20,
          }}
          renderItem={({ item }) => (
            <PetListItem pet={item}/>
          )}
        />
      ) : (
        <Text style={{
          fontFamily: 'lexend-light',
          fontSize: 18,
          marginTop: 10,
        }}>No favorites found</Text>
      )}
    </View>
  )
}
