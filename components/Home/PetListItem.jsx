import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../../constants/Color'
import { useRouter } from 'expo-router'
import MarkFav from '../MarkFavprop';

export default function PetListItem({ pet }) {

    const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: '/petDetails',
        params: pet
      })}
      style={styles.container}
    >
      <Image 
        source={{ uri: pet?.imageURL }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.petName}>{pet?.name}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.breed}>{pet?.breed}</Text>
          <Text style={styles.age}>{pet?.age} YRS</Text>
        </View>
      </View>
      <View style={styles.markFavContainer}>
        <MarkFav pet={pet}/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 3,
    marginRight: 7,
    backgroundColor: Color.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 6,
  },
  image: {
    width: 125,
    height: 170,
    borderRadius: 10,
    margin: 6,
  },
  textContainer: {
    paddingHorizontal: 6,
  },
  petName: {
    fontFamily: 'lexend-light',
    fontSize: 18,
    color: Color.primary,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  breed: {
    fontFamily: 'lexend-light',
    fontSize: 12,
    color: Color.grey,
  },
  age: {
    fontFamily: 'lexend-light',
    fontSize: 11,
    color: Color.primary,
    backgroundColor: Color.lightprimary,
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  markFavContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
})