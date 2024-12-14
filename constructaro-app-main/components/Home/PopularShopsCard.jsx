// Importing necessary components and libraries
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from "../../constants/Colors"; // Importing Colors constants

// Default export for PopularShopsCard component
// Props:
// - shop: an object containing shop information (such as 'name' and 'imageUrl')
export default function PopularShopsCard({ shop, onShopPress }) {
    return (
        <TouchableOpacity onPress={()=>onShopPress(shop)}
          style={{
            width: 80, // Width of each shop card
            marginLeft: 18, // Space on the left of each card
            marginTop: 5, // Space above each card
            borderRadius: 15, // Rounded edges for the card container
            alignItems: 'center', // Center-aligns contents within the card
            justifyContent: 'center', // Vertically centers content in the card
            display:'flex',
          }}
        >
          
          {/* Shop image */}
          <Image
            source={{ uri: shop.imageUrl }} // URL of the shop image
            style={{
              width: 80, // Image width
              height: 80, // Image height
              borderRadius: 15, // Rounded edges for the image
              borderWidth: 1, // Border width for image
              borderColor: Colors.GRAY, // Border color taken from Colors constant
            }}
          />
          
          {/* Shop information container */}
          <View
            style={{
              marginTop: 7, // Space above shop information
              gap: 3, // Vertical space between text elements
              alignItems: 'center', // Center-aligns text within container
            }}
          >
            {/* Shop name */}
            <Text
              style={{
                fontWeight: 600, // Bold font weight for shop name
                fontSize: 13, // Font size for shop name
                marginLeft: 3, // Slight left margin for alignment
                textAlign: 'center', // Center-aligns shop name
              }}
            >
              {shop.name} {/* Displaying the shop name */}
            </Text>
    
            {/* Estimated delivery time */}
            <Text style={{
                fontWeight: 400, // Regular font weight for delivery time
                color: Colors.GRAY, // Gray color for text from Colors constant
                fontSize: 12, // Font size for delivery time
                borderRadius: 5, // Rounded edges for the delivery time text
            }}>
              25-30 mins {/* Displaying a fixed delivery time */}
            </Text>
          </View>
        </TouchableOpacity>
      );
}
