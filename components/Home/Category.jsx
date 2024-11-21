import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Config/FirebaseConfig'
import Colors from '../../constants/Color'

export default function Category() {
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('Dog')
    useEffect(()=>{
        GetCategory()
    }, []) // Add dependency array

    const GetCategory = async () => {
        // get category data from firebase
        setCategory([])
        const snapShot = await getDocs(collection(db, 'Category'))
        snapShot.forEach((doc) => {
            setCategory(category => [...category, doc.data()])
        })
    }

  return (
    <View style={{
        marginTop:10,
    }}>
        <Text style={{
            fontFamily: 'lexend-light',
            fontSize: 15,
        }}>Category</Text>
        
        <FlatList
        style={styles.container}
        numColumns={5}
        data={category}
        // horizontal={true}
        keyExtractor={(item, index) => index.toString()} // Add keyExtractor
        renderItem={({item, index})=>{
            return ( // Add return statement
                <TouchableOpacity
                    onPress={() => setSelectedCategory(item?.animal)}
                    style={{ // Move style prop inside the component
                        flex:1
                    }}>
                    <View style={{
                        alignItems: 'center',
                        backgroundColor: selectedCategory === item?.animal ? Colors.primary : Colors.secondary, // Fix conditional logic
                        padding: 5,
                        borderWidth: 1,
                        borderColor: Colors.primary,
                        margin:2,
                        borderRadius: 7,
                    }}>
                        <Image source={{uri:item?.imageURL}} style={{ width: 50, height: 65, borderRadius:7 }} />
                    </View>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'lexend-light',
                        fontSize: 10,
                    }}>{item?.animal}</Text>
                </TouchableOpacity>
            )
        }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:7,
    padding: 5,
    borderRadius: 7,
    // borderWidth:1,
    borderColor: Colors.primary, // Correct usage
  }
})
