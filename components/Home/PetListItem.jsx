import { View, Text,Image } from 'react-native'
import React from 'react'
import Color from '../../constants/Color'

export default function PetListItem({pet}) {
  return (
    <View style={{
        padding:3,
        marginRight:10,
        backgroundColor:Color.white,
        borderRadius:10
    }}>
        <Image 
        source={{uri:pet?.imageURL}}
        style={{
            width: 130,
            height: 170,
            borderRadius: 10,
            // resizeMode: 'contain',
            objectFit: 'Cover', // Adjust style
            margin:6
        }}
        />
        <Text style={{
            fontFamily:'lexend-light',
            fontSize:18,
        }}>{pet?.name}</Text>
        <Text style={{
            fontFamily:'lexend-light',
            fontSize:12,
            color:Color.grey
        }}>{pet?.breed}</Text>
    </View>
  )
}