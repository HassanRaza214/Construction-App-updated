import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import WorkersListCard from '../../components/WorkersList/WorkersListCard';

export default function WorkersListByCategory() {
  const {category}=useLocalSearchParams();

  const [workersList,setWorkersList]=useState([])

  useEffect(()=>{

    navigation.setOptions({
        headerShown:true,
        headerTitle:category
    })

    getWorkersList();
  },[]) 
  
  const getWorkersList=async()=>{
    const q=query(collection(db,'WorkersList'),where("category",'==',category))
    const querySnapShot=await getDocs(q);

    querySnapShot.forEach((doc)=>{
        console.log(doc.data())
        setWorkersList((prev)=>[...prev,{id:doc.id, ...doc.data()}])
    })
  }

  const navigation=useNavigation();

  return (
    <View>
      {workersList.length>0?<FlatList
      data={workersList}
      renderItem={({item,index})=>(
        <WorkersListCard workers={item} key={index}/>
      )}/>:<Text
      style={{fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:'50%',
      }}
      >No Worker Found</Text>}
    </View>
  )
}