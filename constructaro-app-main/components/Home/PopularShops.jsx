// Importing necessary components and libraries from React Native, Firebase, and custom files
import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors"; // Importing colors from constants
import { collection, getDocs, limit, query } from "firebase/firestore"; // Firebase Firestore functions
import { db } from "../../configs/FireBaseConfig"; // Firebase database configuration
import PopularShopsCard from "./PopularShopsCard"; // Component for rendering each shop card
import { useRouter  } from "expo-router";

// Default export function for PopularShops component
export default function PopularShops() {
    // State to hold the list of popular shops
    const [shopsList, setShopsList] = useState([]);
    const router=useRouter();

    // useEffect hook to fetch shops list when the component mounts
    useEffect(() => {
        GetShopsList(); // Calls the function to retrieve shop data
    }, []);

    // Async function to fetch popular shops data from Firebase Firestore
    const GetShopsList = async () => {
        setShopsList([]); // Clears previous shop data

        // Create a query to fetch the first 10 documents from 'ShopsList' collection
        const q = query(collection(db, 'ShopsList'), limit(10));
        const querySnapshot = await getDocs(q); // Await response from Firestore

        // Iterating over each document in the query snapshot
        querySnapshot.forEach((doc) => {
            console.log(doc.data()); // Log document data (for debugging)

            // Append each shop's data to the shopsList state
            setShopsList((prev) => [...prev, doc.data()]);
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
                    Popular Shops
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

            {/* FlatList to display the list of popular shops */}
            <FlatList
                data={shopsList} // Data source for the FlatList
                horizontal={true} // Display items in a horizontal row
                showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
                renderItem={({ item, index }) => (
                    // Render each item using PopularShopsCard component
                    <PopularShopsCard key={index} shop={item} onShopPress={(shop)=>router.push('/ProductList/' + item.name) } /> 
                )}
            />
        </View>
    );
}
