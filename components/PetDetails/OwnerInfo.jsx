import { View, Text, Image } from 'react-native'
import React from 'react'
import Color from '../../constants/Color'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OwnerInfo({pet}) {
  return (
    <View style={{
        paddingHorizontal:20,
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 20,
        backgroundColor: Color.white,
        display: 'flex',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        justifyContent: 'space-between',
        // marginBottom: 20,
    }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 15,
            display: 'flex',
        }}>
            <Image source = {{uri:pet?.userImage}} style={{
                width: 30,
                height: 30,
                borderRadius: 25,
                margin: 10,
            }}/>

            <View style={{
                paddingHorizontal: 10,
            }}>
                <Text style={{
                    fontFamily: 'lexend-medium',
                    fontSize: 13,
                    color: Color.primary,
                }} >{pet?.username}</Text>
                <Text style={{
                    fontFamily: 'lexend-light',
                    fontSize: 10,
                    color: Color.grey,
                }}>Pet Owner</Text>
            </View>
        </View>

            <Ionicons name="send" size={24} color={Color.primary} />
    </View>
  )
}