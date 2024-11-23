import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import Color from '../../constants/Color'

export default function PetSubInfoCard({ icon, label, value }) {
  return (
    <View style={styles.infoBox}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.white,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    gap: 5,
    width: '48%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  label: {
    fontFamily: 'lexend-medium',
    fontSize: 14,
    color: Color.grey,
  },
  value: {
    fontFamily: 'lexend-light',
    fontSize: 14,
    color: Color.primary,
  },
})
