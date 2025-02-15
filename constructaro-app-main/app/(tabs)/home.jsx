import { View, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import PopularWorkers from '../../components/Home/PopularWorkers';
import PopularShops from '../../components/Home/PopularShops';
import ServiceMenu from '../../components/Home/ServiceMenu';

export default function Home() {
  return (
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
      <Header />
      <ServiceMenu/>
      <Slider />
      <Category />
      <PopularWorkers />
      <PopularShops />
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
}
