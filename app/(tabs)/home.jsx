import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'

export default function home() {
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
    </View>
  )
}