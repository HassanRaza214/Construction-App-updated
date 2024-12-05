// Importing necessary components from React Native
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

// Defining the CategoryItem component
// Props:
// - category: an object representing a category (containing 'name' and 'icon' properties)
// - onCategoryPress: a function to handle what happens when the category is pressed
export default function CategoryItem({ category, onCategoryPress }) {
  return (
    // TouchableOpacity to make the category item clickable
    // Calls onCategoryPress function with the current category as a parameter when pressed
    <TouchableOpacity onPress={() => { onCategoryPress(category); }}>
      
      {/* Icon container for category image */}
      <View style={{
        padding: 15, // Padding around the image
        backgroundColor: Colors.ICON_BG, // Background color for icon, taken from Colors constant
        borderRadius: 99, // Rounded shape for the container
        marginRight: 15, // Space to the right of each icon
      }}>
        
        {/* Displaying the category icon */}
        <Image 
          source={{ uri: category.icon }} // Image URI is taken from category object
          style={{ width: 35, height: 35 }} // Setting width and height of the icon
        />
      </View>

      {/* Displaying category name below the icon */}
      <Text 
        style={{
          fontSize: 12, // Font size for the category name
          fontWeight: 600, // Font weight for a bold appearance
          textAlign: 'center', // Center-align text
          marginTop: 3, // Space above the category name
          marginLeft: -13, // Adjusting position slightly to center with icon
        }}
      >
        {category.name} {/* Displaying the name of the category */}
      </Text>
    </TouchableOpacity>
  );
}
