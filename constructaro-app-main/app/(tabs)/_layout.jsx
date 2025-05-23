import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from './../../constants/Colors';

export default function TabLayout() {
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
        }}/>
        <Tabs.Screen name='postajob'
        options={{
          tabBarLabel:'Post a Job',
          tabBarIcon:({color})=><AntDesign name="pluscircleo" size={24} color={color} />
        }}/>
        <Tabs.Screen name='shops' 
        options={{
          tabBarLabel:'Shops',
          tabBarIcon:({color})=><Entypo name="shop" size={24} color={color} />
        }}/>
        <Tabs.Screen name='profile' 
        options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color})=><Ionicons name="person" size={24} color={color} />
        }}/>
    </Tabs>
  )
}