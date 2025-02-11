import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import { Colors } from './../../constants/Colors';
import Category from '../../components/Home/Category';
import WorkersListCard from '../../components/Hire/WorkersListCard';
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
  const GetWorkersByCategory = useCallback(
    async (category) => {
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
    },
    [allWorkersList]
  );

  const renderWorkerCard = ({ item }) => (
    <WorkersListCard worker={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <Text style={styles.headerText}>Hire</Text>
            </View>
<View style={styles.subContainer}>
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
        <FlatList
          data={filteredWorkers}
          renderItem={renderWorkerCard}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No workers found</Text>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer:{
    padding:20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  loader: {
    marginVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.GRAY,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 20,
    fontWeight:'bold',
    paddingTop:30
  },
});