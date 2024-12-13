import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Searchbar from '../../components/Hire/Searchbar';
import PopularShops from '../../components/Home/PopularShops';

export default function shops() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shops</Text>

      {/*Searchbar*/}
      <Searchbar/>

      <PopularShops/>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
});
