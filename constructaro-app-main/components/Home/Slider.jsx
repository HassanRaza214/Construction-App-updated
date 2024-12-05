// Importing necessary components and libraries
import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore"; // Firebase Firestore functions
import { db } from "./../../configs/FireBaseConfig"; // Firebase database configuration

// Default export function for Slider component
export default function Slider() {
  // State to hold the list of images for the slider
  const [sliderList, setSliderList] = useState([]);

  // useEffect hook to fetch slider images when the component mounts
  useEffect(() => {
    GetSliderList(); // Calls the function to retrieve slider data
  }, []);

  // Async function to fetch slider images from Firebase Firestore
  const GetSliderList = async () => {
    setSliderList([]); // Clears previous slider data

    // Create a query to fetch all documents from the 'Slider' collection
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q); // Await response from Firestore

    // Iterating over each document in the query snapshot
    querySnapshot.forEach((doc) => {
      console.log(doc.data()); // Log document data (for debugging)

      // Append each slider's data to the sliderList state
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      {/* Title for the slider section */}
      <Text
        style={{
          fontSize: 20, // Font size for the title
          paddingLeft: 20, // Left padding for alignment
          paddingTop: 20, // Top padding for spacing
          marginBottom: 10, // Bottom margin for space below the title
          fontWeight: 700, // Bold font for title
        }}
      >
        Special for you
      </Text>

      {/* FlatList to display the slider images */}
      <FlatList
        data={sliderList} // Data source for the FlatList
        horizontal={true} // Display items in a horizontal row
        style={{
          paddingLeft: 15, // Left padding for alignment
        }}
        showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
        renderItem={({ item, index }) => (
          // Render each item as an Image component
          <Image
            source={{ uri: item.imageUrl }} // URL for slider image
            style={{
              width: 300, // Image width
              height: 175, // Image height
              borderRadius: 15, // Rounded edges for the image
              marginRight: 15, // Right margin for spacing between images
            }}
          />
        )}
      />
    </View>
  );
}
