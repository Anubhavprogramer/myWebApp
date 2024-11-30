import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Color from '../../constants/Color';
import { Link } from 'expo-router';

export default function UserItem({ userInfo }) {
  if (!userInfo || userInfo.length === 0) {
    return null; // Handle case where userInfo is missing
  }

  return (
    <>
      <Link href={{ pathname: '/chat', params: { id: String(userInfo?.docId) } }}>
        <View style={styles.card}>
          <Image
            source={{ uri: userInfo[0]?.imageURL }}
            style={styles.image}
          />
          <Text style={styles.text}>
            {userInfo[0]?.name || 'User Name'}
          </Text>
        </View>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Color.primary,
  },
  text: {
    fontSize: 18,
    fontFamily: 'lexend-regular',
    color: Color.darkText,
    fontWeight: '500',
    flex: 1, // Ensures text takes remaining space
  },
});
