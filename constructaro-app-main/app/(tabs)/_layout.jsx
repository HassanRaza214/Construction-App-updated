import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from './../../constants/Colors';

export default function TabLayout() {
  const[hirePress,setHirePress]=useState(false)
  const[shopPress,setShopPress]=useState(false)
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:Colors.PRIMARY
      }}>
        <Tabs.Screen name='home'
        options={{
          tabBarLabel:'Home',
          tabBarIcon:({color})=><FontAwesome name="home" size={24} color={color} />
        }}/>
        <Tabs.Screen name='hire' 
        options={{
          tabBarLabel:'Hire',
          tabBarIcon:({color})=><FontAwesome5 name="hire-a-helper" size={24} color={color} />
        }}
        listeners={{
          tabPress:(e)=>{
            setHirePress(true),
            setShopPress(false)
          }
        }}/>
        <Tabs.Screen name='shops' 
        options={{
          tabBarLabel:'Shops',
          tabBarIcon:({color})=><Entypo name="shop" size={24} color={color} />
        }}
        listeners={{
          tabPress:(e)=>{
            setShopPress(true),
            setHirePress(false)
          }
        }}/>
        <Tabs.Screen name='profile' 
        options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color})=><Ionicons name="person" size={24} color={color} />
        }}/>
    </Tabs>
  )
}