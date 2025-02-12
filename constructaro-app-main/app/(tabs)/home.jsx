import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularWorkers from '../../components/Home/PopularWorkers'
import PopularShops from '../../components/Home/PopularShops'
import { useRouter } from 'expo-router';
import { auth } from '../../configs/FireBaseConfig';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (!auth.currentUser) {
        router.replace('/(auth)/login');
      }
    };
    
    checkAuth();
    
    // Optionally set up a listener for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace('/(auth)/login');
      }
    });
    
    return unsubscribe;
  }, []);

  return (
    <ScrollView style={{backgroundColor:"#ffffff"}}>
      <Header/>
      <Slider/>
      <Category/>
      <PopularWorkers/>
      <PopularShops/>
      <View style={{height:50}}></View>
    </ScrollView>
  )
}