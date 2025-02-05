import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Searchbar from '../../components/Hire/Searchbar';
import PopularShops from '../../components/Home/PopularShops';
import Products from '../../components/Shops/Products';
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import { Colors } from '../../constants/Colors';

export default function Shops() {
    const [allproductsList, setAllproductsList] = useState([]);
    const [productsList, setproductsList] = useState([]);
    const [filteredproducts, setFilteredproducts] = useState([]);
    const [loading, setLoading] = useState(false);
  
    // Fetch all products initially
    useEffect(() => {
      const fetchAllproducts = async () => {
        try {
          setLoading(true);
          const querySnapshot = await getDocs(collection(db, 'ItemsList'));
          const products = [];
          querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
          });
          setAllproductsList(products);
          setproductsList(products);
          setFilteredproducts(products);
        } catch (error) {
          console.error('Error fetching all products:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAllproducts();
    }, []);

      const renderProductCard = ({ item }) => (
        <Products products={item}/>
      );
  
  return (
    <View style={styles.container}>
      {/* Heading and Searchbar with Padding */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Shops</Text>
      <Searchbar
        productsList={productsList}
        onSearch={(filteredList) => setFilteredproducts(filteredList)}
      />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        <PopularShops />
      <View style={{padding:20,
        paddingBottom:-15
      }}>
        <Text style={{fontSize: 20, fontWeight: 'bold' }}>Products</Text>
      </View>

      {/* products List or Loader */}
            {loading ? (
              <ActivityIndicator size="large" color={Colors.PRIMARY} style={styles.loader} />
            ) : (
              <FlatList
                data={filteredproducts}
                renderItem={renderProductCard}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No products found</Text>
                  </View>
                )}
                contentContainerStyle={styles.listContainer}
              />
            )}
          </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes full screen height
    marginTop: 50,
    backgroundColor: '#f9f9f9', // Optional: Add a light background color for better aesthetics
  },
  headerContainer: {
    paddingHorizontal: 15, // Horizontal padding for consistent spacing
    paddingBottom: 10,
  },
  scrollContainer: {
    marginTop: 10, // Add spacing between the search bar and scroll content
    flexGrow: 1, // Allow the scroll view to grow
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333', // Optional: Add color for better visibility
    marginBottom: 10, // Consistent spacing below the title
  },
  listContainer: {
    paddingBottom: 20,
  },
});
