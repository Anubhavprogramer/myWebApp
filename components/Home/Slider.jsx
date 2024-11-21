import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../Config/FirebaseConfig'
import { getDocs, collection } from 'firebase/firestore'

export default function Slider() {

    const [sliderList, setSliderList] = useState([])

    useEffect(() => {
        getSliderData()
    }, [])

    const getSliderData = async () => {
        setSliderList([]);
        const snapShot = await getDocs(collection(db, 'Slider'))
        snapShot.forEach(doc => {
            // console.log(doc.data())
            setSliderList(sliderList => [...sliderList, doc.data()])
        })
    }

    return (
        <View 
        style={{
            marginTop:10
        }}>
            <FlatList
                horizontal={true}
                data={sliderList}
                renderItem={({ item,index }) =>(
                    <View key={index}>
                        <Image source={{uri:item?.imageURL}}
                        style={styles?.sliderImage}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}


const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get('window').width*0.9,
    borderRadius: 10,
    height: 200,
    marginRight: 10,
  },
})
