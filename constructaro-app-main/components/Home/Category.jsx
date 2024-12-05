// Importing required components and libraries from React Native, Firebase, and Expo Router
import { View, Text, FlatList, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "./../../constants/Colors";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import CategoryItem from "../../components/Home/CategoryItem";
import { useRouter } from "expo-router";

// Default export function 'Category' component to display category list
export default function Category() {
  // Initializing a state to store the list of categories
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter(); // Initialize router for navigation

  // useEffect hook to fetch category list when the component mounts
  useEffect(() => {
    GetCategoryList();
  }, []);

  // Function to fetch category data from Firebase Firestore
  const GetCategoryList = async () => {
    setCategoryList([]); // Clear previous category data

    // Firebase query to get documents from the 'Category' collection
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q); // Await response

    // Iterating over each document in the query snapshot
    querySnapshot.forEach((doc) => {
      console.log(doc.data()); // Log document data (for debugging)

      // Update categoryList state with new category data
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      {/* Header View: Contains "Category" title and "View All" button */}
      <View
        style={{
          paddingLeft: 20,
          marginBottom: 10,
          paddingRight: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700, // Title style for "Category"
          }}
        >
          Category
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY, // Color taken from Colors constant
            marginTop: 5, // Styling "View All" button
          }}
        >
          View All
        </Text>
      </View>

      {/* Main Content View: Contains FlatList to display categories */}
      <View style={{ marginLeft: 15 }}>
        <FlatList
          data={categoryList} // Data source for the FlatList
          horizontal={true} // Display items in a horizontal row
          showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
          
          // Render each item using CategoryItem component
          renderItem={({ item, index }) => (
            <CategoryItem
              category={item} // Pass category data as prop
              key={index} // Unique key for each item
              onCategoryPress={(category) => 
                router.push('/workerslist/' + item.name) // Navigate to worker list by category
              }
            />
          )}
        />
      </View>
    </View>
  );
}
