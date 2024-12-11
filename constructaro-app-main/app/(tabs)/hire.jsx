import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { Colors } from './../../constants/Colors';
import Category from  '../../components/Home/Category';
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import HireWorkersList from '../../components/Hire/HireWorkersList';

export default function hire() {

  const [workersList,setWorkersList]=useState([])

  const GetWorkersByCategory=async(category)=>{
    const q=query(collection(db,'WorkersList'),where('category','==',category))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setWorkersList(prev=>[...prev,{id:doc.id,...doc.data()}])
    });
  }

  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontSize:30,
        fontWeight:900,
      }}>Hire</Text>
      <View style={{
        display: 'flex', // Enables flexbox layout
        flexDirection: 'row', // Positions items in a row
        gap: 10, // Space between icon and input field
        alignItems: 'center', // Vertically centers items
        backgroundColor: '#fff', // Background color for search bar
        padding: 10, // Padding inside the search bar
        marginVertical: 10, // Vertical margin for spacing
        marginTop: 15, // Adjusts top margin for alignment
        borderRadius: 50, // Rounded edges for the search bar
        height: 45, // Fixed height of the search bar
        borderWidth:1,
        borderColor:Colors.PRIMARY
      }}>
        
        {/* Search icon */}
        <Ionicons 
          name="search" // Icon name from Ionicons library
          size={24} // Icon size
          color={Colors.PRIMARY} // Icon color from Colors constants
        />

        {/* Text input for search bar */}
        <TextInput 
          placeholder='search...' // Placeholder text for input
          style={{
            fontSize: 16, // Font size for input text
          }}
        />
      </View>

      <Category
      explore={true}
      onCategorySelect={(category)=>GetWorkersByCategory(category)}
      />

      <HireWorkersList workersList={workersList}/>
    </View>
  )
}