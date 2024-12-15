// Importing necessary components and libraries from React Native, Firebase, and custom files
import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors"; // Importing colors from constants
import { collection, getDocs, limit, query } from "firebase/firestore"; // Firebase Firestore functions
import { db } from "../../configs/FireBaseConfig"; // Firebase database configuration
import PopularWorkersCard from "./PopularWorkersCard"; // Component for rendering each worker card

// Default export function for PopularWorkers component
export default function PopularWorkers() {

  // State to hold the list of popular workers
  const [workersList, setWorkersList] = useState([]);

  // useEffect hook to fetch workers list when the component mounts
  useEffect(() => {
    GetPopularWorkers(); // Calls the function to retrieve worker data
  }, []);

  // Async function to fetch popular workers data from Firebase Firestore
  const GetPopularWorkers = async () => {
    setWorkersList([]); // Clears previous workers data

    // Create a query to fetch the first 10 documents from 'WorkersList' collection
    const q = query(collection(db, 'WorkersList'), limit(10));
    const querySnapshot = await getDocs(q); // Await response from Firestore

    // Iterating over each document in the query snapshot
    querySnapshot.forEach((doc) => {
      console.log(doc.data()); // Log document data (for debugging)

      // Append each worker's data to the workersList state
      setWorkersList((prev) => [...prev, {id:doc.id,...doc.data()}]);
    });
  };

  return (
    <View>
      {/* Header section with title and 'View All' button */}
      <View
        style={{
          paddingLeft: 20, // Padding on left for alignment
          marginBottom: 10, // Space below header
          paddingRight: 20, // Padding on right for alignment
          display: "flex", // Enables flexbox layout
          flexDirection: "row", // Positions items in a row
          justifyContent: "space-between", // Space between title and 'View All'
          marginTop: 20, // Space above header
        }}
      >
        <Text
          style={{
            fontSize: 20, // Font size for title
            fontWeight: 700, // Bold font for title
          }}
        >
          Popular Workers
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY, // Text color from Colors constant
            marginTop: 5, // Slight space above 'View All' text
          }}
        >
          View All
        </Text>
      </View>

      {/* FlatList to display the list of popular workers */}
      <FlatList
        data={workersList} // Data source for the FlatList
        horizontal={true} // Display items in a horizontal row
        showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
        renderItem={({ item, index }) => (
          // Render each item using PopularWorkersCard component
          <PopularWorkersCard key={index} worker={item} /> // Pass worker data as prop to PopularWorkersCard
        )}
      />
    </View>
  );
}
