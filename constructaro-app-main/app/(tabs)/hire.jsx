
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import { Colors } from './../../constants/Colors';
import Category from '../../components/Home/Category';
import HireWorkersList from '../../components/Hire/HireWorkersList';
import Searchbar from '../../components/Hire/Searchbar';

export default function Hire() {
  const [allWorkersList, setAllWorkersList] = useState([]);
  const [workersList, setWorkersList] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all workers initially
  useEffect(() => {
    const fetchAllWorkers = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'WorkersList'));
        const workers = [];
        querySnapshot.forEach((doc) => {
          workers.push({ id: doc.id, ...doc.data() });
        });
        setAllWorkersList(workers);
        setWorkersList(workers);
        setFilteredWorkers(workers);
      } catch (error) {
        console.error('Error fetching all workers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWorkers();
  }, []);

  // Fetch workers by category
  const GetWorkersByCategory = useCallback(async (category) => {
    try {
      setLoading(true);
      if (!category) {
        // Reset to all workers if no category is selected
        setWorkersList(allWorkersList);
        setFilteredWorkers(allWorkersList);
        return;
      }
      const q = query(collection(db, 'WorkersList'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const workers = [];
      querySnapshot.forEach((doc) => {
        workers.push({ id: doc.id, ...doc.data() });
      });
      setWorkersList(workers);
      setFilteredWorkers(workers);
    } catch (error) {
      console.error('Error fetching workers by category:', error);
    } finally {
      setLoading(false);
    }
  }, [allWorkersList]);

  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
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
    </ScrollView> 
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
