import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Color from '../../constants/Color'

export default function Home() {
  return (
    <View 
    style={{
      padding:20,
      
      // marginTop:20
    }}>
      {/* header */}
      <Header/>
      {/* Slider */}
      <Slider/>
      {/* Category */}
      <PetListByCategory/>
      {/* Add new pet option */}

      <TouchableOpacity style={styles.addnewpetContainer}>
        <Text style={{
          fontFamily: 'lexend-medium',
          color: Color.primary,
        }}>Add new Pet</Text>
        <MaterialIcons name="pets" size={24} color={Color.primary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  addnewpetContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:20,
    padding:10,
    flexDirection:'row',
    gap:10,
    backgroundColor: Color.lightpriimary,
    borderColor: Color.primary,
    borderRadius:10,
    borderWidth:1,
    justifyContent:'center',
  }
})
