import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Color from '../../constants/Color'

export default function AboutPet({ pet }) {
    const [readmore, setReadmore] = React.useState(false);
  return (
    <View style={{
        padding: 20,
    }}>
      <Text style={{
            fontSize: 20,
            fontFamily: 'lexend-bold',
            marginBottom: 10,
      }}>About {pet?.name} </Text>
      <Text numberOfLines={readmore ? undefined : 3} style={{
            fontFamily: 'lexend-light',
            fontSize: 14,
            color: Color.grey,
      }}>{pet?.about}</Text>
      <TouchableOpacity onPress={() => setReadmore(!readmore)}>
        <Text style={{
            fontFamily: 'lexend-light',
            fontSize: 14,
            color: Color.blue,
        }}>{readmore ? '..Read less' : 'Read more..'}</Text>
      </TouchableOpacity>
    </View>
  )
}