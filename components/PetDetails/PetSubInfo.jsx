import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import Color from '../../constants/Color'
import PetSubInfoCard from './PetSubInfoCard'

export default function PetSubInfo({ pet }) {
  return (
    <View style={styles.container}>
      <PetSubInfoCard icon={require('../../assets/images/Calander.png')} label={"Age"} value={ pet?.age + " YRS"      } />
      <PetSubInfoCard icon={require('../../assets/images/breed.png')} label={"Breed"} value={pet?.breed}/>
      <PetSubInfoCard icon={require('../../assets/images/gender.png')} label={"Gender"} value={pet?.sex}/>
      <PetSubInfoCard icon={require('../../assets/images/weight.png')} label={"Weight" } value={pet?.weight + "Kg"}/>
      
      
      {/* Add more info boxes as needed */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    flex: 1,
  },
  
})