import { View, Text, FlatList, StyleSheet, TouchableOpacity,Image } from 'react-native'
import { collection, getDocs, query} from "firebase/firestore"; // Firebase Firestore functions
import { db } from "../../configs/FireBaseConfig"; // Firebase database configuration
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';

export default function Products({products}) {

    return (
        <View >

                        <TouchableOpacity
                          style={{
                            padding: 10, // Padding around the card content
                            margin: 10, // Margin around the card
                            borderRadius: 15, // Rounded edges for the card
                            backgroundColor: Colors.ICON_BG, // Background color from Colors constant
                            display: 'flex', // Enables flexbox layout
                            flexDirection: 'row', // Positions items in a row
                            gap: 10, // Space between elements
                          }}
                        >
                          
                          {/*  product image */}
                          <Image 
                            source={{ uri: products.imageUrl }} // URL for worker's profile image
                            style={{
                              width: 80, // Image width
                              height: 80, // Image height
                              borderRadius: 99, // Circular image
                              borderWidth: 2, // Border width for image
                              borderColor: Colors.GRAY, // Border color from Colors constant
                            }}
                          />
                          
                          {/* Worker information container */}
                          <View style={{
                            display: 'flex', // Enables flexbox layout
                            flex: 1, // Flex-grow to take up remaining space
                            gap: 5, // Vertical spacing between text elements
                          }}>
                            
                            {/* Worker name */}
                            <Text style={{
                              fontSize: 18, // Font size for worker name
                              fontWeight: 700, // Bold font for worker name
                            }}>
                              {products.name} {/* Displaying the worker's name */}
                            </Text>
                            
                            {/* Worker city */}
                            <Text style={{
                              fontSize: 15, // Font size for city text
                              fontWeight: 400, // Regular font weight for city text
                              color: Colors.GRAY, // Gray color for city text
                            }}>
                              Rs.{products.price} {/* Displaying the worker's city */}
                            </Text>
                            
                            {/* Rating section */}
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                              <Image 
                                source={require('./../../assets/Images/star.png')} // Star icon for rating
                                style={{
                                  width: 13, // Icon width
                                  height: 13, // Icon height
                                  marginTop: 2, // Top margin to align with text
                                }}
                              />
                              <Text style={{
                                fontWeight: '500', // Medium font weight for rating
                                fontSize: 13, // Font size for rating text
                              }}>
                                4.5 {/* Static rating value */}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>

        </View>
    )
}