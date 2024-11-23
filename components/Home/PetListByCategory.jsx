import { View, Text, FlatList } from 'react-native' // Correct import
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection, where, getDocs, query } from 'firebase/firestore'
import { db } from '../../Config/FirebaseConfig'
import PetListItem from './PetListItem'

export default function PetListByCategory() {
  const [petList,setPetList] = useState([])
  const [loader,setLoader] = useState(false)
  useEffect(()=>{
    getPetList('Dog')
  }, []) // Add dependency array to avoid infinite loops
  const getPetList = async (Category) => {
    setLoader(true)
    // console.log(Category)
    try {
      // get pet list by category
      const q = query(collection(db, 'Pets'), where('category', '==', Category))
      const querySnapshot = await getDocs(q)
      setPetList([])
      if (querySnapshot.empty) {
        console.log('No matching documents.')
        return
      }

      querySnapshot.forEach((doc) => {
        setPetList(petList=>[...petList,doc.data()])
      })

    } catch (error) {
      console.error("Error getting documents: ", error)
    }
    setLoader(false)
  }

  return (
    <View>
        <Category myselectedCategory={(value)=>{
          getPetList(value)
        }}/>

        <FlatList
        data={petList}
        horizontal={true}
        refreshing={loader}
        onRefresh={()=>getPetList('Dog')}
        renderItem={({item,index})=>{
          return <PetListItem pet={item}/> // Add return statement
        }}
        ></FlatList>
    </View>
  )
}