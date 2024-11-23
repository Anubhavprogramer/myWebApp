import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import Petinfo from '../../components/PetDetails/petinfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Color from '../../constants/Color';

export default function PetDetails() {
    const pet = useLocalSearchParams();
    // console.log(pet)
    const navigator = useNavigation();
    useEffect(()=>{
        navigator.setOptions({
            title: "",
        })
    },[])
  return (
    <View>
    <ScrollView>
    <View>
        {/* pet info */}
        <Petinfo pet={pet}/>
        {/* pet props */}
        <PetSubInfo pet={pet}/>
        {/* about */}
        <AboutPet pet={pet}/>
        {/* owner details */}
        <OwnerInfo pet={pet}/>
        {/* adopt me */}
        <View style={{
          height: 70
        }}></View>
    </View>
    </ScrollView>
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.adoptBtn} >
        <Text style={{
          textAlign: "center",
          color: "white",
          padding: 10,
          fontSize: 20,
          fontFamily: 'lexend-bold'
        }}>Adopt Me</Text>
      </TouchableOpacity>
    </View>
    </View>

  )
}

const styles = StyleSheet.create({
  adoptBtn:{
    backgroundColor: Color.primary,
    // borderRadius: 15,
  },
  btnContainer:{
    position: "absolute",
    bottom: 0,
    width: "100%",
    // padding: 10
  }
})
