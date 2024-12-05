// Importing necessary components and libraries
import { View, Image, TextInput } from 'react-native';
import React from 'react';
import { Colors } from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons'; // Icon library for using Ionicons

// Default export for Header component
export default function Header() {
  return (
    <View style={{
      padding: 20, // Padding around the entire header section
      paddingTop: 25, // Additional padding on top
      backgroundColor: Colors.PRIMARY, // Header background color from Colors constants
    }}>
      
      {/* Logo container */}
      <View>
        <Image 
          source={require('./../../assets/Images/logo.png')} // Path to logo image
          style={{
            width: 150, // Width of the logo
            height: 80, // Height of the logo
          }}
          resizeMode='contain' // Ensures the image is scaled to fit within its bounds
        />
      </View>
      
      {/* Search bar section */}
      <View style={{
        display: 'flex', // Enables flexbox layout
        flexDirection: 'row', // Positions items in a row
        gap: 10, // Space between icon and input field
        alignItems: 'center', // Vertically centers items
        backgroundColor: '#fff', // Background color for search bar
        padding: 10, // Padding inside the search bar
        marginVertical: 10, // Vertical margin for spacing
        marginTop: -1, // Adjusts top margin for alignment
        borderRadius: 50, // Rounded edges for the search bar
        height: 45, // Fixed height of the search bar
      }}>
        
        {/* Search icon */}
        <Ionicons 
          name="search" // Icon name from Ionicons library
          size={24} // Icon size
          color={Colors.PRIMARY} // Icon color from Colors constants
        />

        {/* Text input for search bar */}
        <TextInput 
          placeholder='search...' // Placeholder text for input
          style={{
            fontSize: 16, // Font size for input text
          }}
        />
      </View>
    </View>
  );
}
