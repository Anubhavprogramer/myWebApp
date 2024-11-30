import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Color from '../../constants/Color';
import { useRouter } from 'expo-router'; 

export default function profile() {
  const { user } = useUser(); // Destructure user correctly
  const { signOut } = useAuth(); // Destructure signOut correctly
  const router = useRouter(); // Add this line
  const Menu = [
    {
      id: 1,
      name: 'Logout',
      icon: 'exit-outline',
      path: 'logout'
    },
    {
      id: 2,
      name: 'My Post',
      icon: 'bookmark',
      path: 'userpost'
    }
  ]

  const onPressMenu = (menu) => {
    if (menu.path === 'logout') { // Correct comparison
      signOut().then(() => {
        router.replace('/login'); // Use router.replace for navigation
      });
    }
    if (menu.path === 'userpost') {
      router.push('/../userpost');
    }
  }

  return (
    <View style={{
      padding: 20,
      marginTop: 10,
    }}>
      <Text style={{
        fontFamily: 'lexend-regular',
        fontSize: 24,
      }}>Profile</Text>

      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginVertical: 25
      }}>
        <Image source={{ uri: user?.imageUrl }} style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginTop: 20
        }} />
        <Text style={{
          fontFamily: 'lexend-regular',
          fontSize: 20,
          marginTop: 10
        }}>{user?.fullName}</Text>
        <Text style={{
          fontFamily: 'lexend-regular',
          fontSize: 16,
          color: '#777'
        }}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      <FlatList 
        data={Menu}
        keyExtractor={(item) => item.id.toString()} // Add keyExtractor
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
          >
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 10,
              padding: 20,
              backgroundColor: Color.secondary,
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
              marginBottom: 10
            }}>
              <Text style={{
                fontFamily: 'lexend-regular',
                fontSize: 18
              }}>{item.name}</Text>
              <Ionicons name={item.icon} size={24} color="Red" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}