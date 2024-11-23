import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Color from '../../constants/Color'
import MarkFav from '../MarkFavprop'

export default function Petinfo({ pet }) {
    // console.log(pet)
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: pet?.imageURL }}
        style={styles.image}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.petName}>{pet?.name}</Text>
          <Text style={styles.petAddress}>{pet?.address}</Text>
        </View>
        <MarkFav pet={pet}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 500,
    marginTop: 0, // Ensure the image comes from the top
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    borderRadius: 10,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column',
  },
  petName: {
    color: Color.white,
    fontSize: 24,
    fontFamily: 'lexend-medium',
  },
  petAddress: {
    color: Color.gray,
    fontSize: 12,
    fontFamily: 'lexend-bold',
    fontWeight: 'bold',
  },
  heartIcon: {
    marginRight: 10,
  },
})