import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Searchbar from '../../components/Hire/Searchbar';
import PopularShops from '../../components/Home/PopularShops';
import Products from '../../components/Shops/Products';

export default function Shops() {
  return (
    <View style={styles.container}>
      {/* Heading and Searchbar with Padding */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Shops</Text>
        <Searchbar />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        <View>
          <PopularShops />
        </View>
        <View>
          <Products />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes full screen height
    marginTop: 20,
  },
  headerContainer: {
    padding: 15, // Padding applied only to Shops heading and Searchbar
    paddingBottom:-30,
    marginBottom:-20
  },
  scrollContainer: {
    marginTop: 10, // Add spacing between the search bar and scroll content
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
