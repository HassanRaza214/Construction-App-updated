import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import { Colors } from './../../constants/Colors';
import Category from '../../components/Home/Category';
import HireWorkersList from '../../components/Hire/HireWorkersList';
import Searchbar from '../../components/Hire/Searchbar';

export default function Hire() {
  const [workersList, setWorkersList] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetWorkersByCategory = useCallback(async (category) => {
    try {
      setLoading(true);
      const q = query(collection(db, 'WorkersList'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const workers = [];
      querySnapshot.forEach((doc) => {
        workers.push({ id: doc.id, ...doc.data() });
      });
      setWorkersList(workers);
      setFilteredWorkers(workers); // Initialize filtered list
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hire</Text>

      {/* Searchbar */}
      <Searchbar 
        workersList={workersList} 
        onSearch={(filteredList) => setFilteredWorkers(filteredList)} 
      />

      {/* Category Selector */}
      <Category 
        explore={true} 
        onCategorySelect={(category) => GetWorkersByCategory(category)} 
      />

      {/* Workers List or Loader */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} style={styles.loader} />
      ) : (
        <HireWorkersList workersList={filteredWorkers} />
      )}
    </View>
  );
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
