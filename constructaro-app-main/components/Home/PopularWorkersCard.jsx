// Importing necessary components and libraries
import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors"; // Importing Colors constants

// Default export function for PopularWorkersCard component
// Props:
// - worker: an object containing worker information (such as 'name', 'city', 'category', and 'imageUrl')
export default function PopularWorkersCard({ worker }) {
  return (
    <View
      style={{
        marginLeft: 20, // Left margin to space out each card
        padding: 10, // Padding inside the card for spacing
        backgroundColor: Colors.ICON_BG, // Background color for card from Colors constant
        borderRadius: 15, // Rounded edges for the card
      }}
    >
      
      {/* Worker image */}
      <Image
        source={{ uri: worker.imageUrl }} // URL for worker's profile image
        style={{
          width: 200, // Image width
          height: 130, // Image height
          borderRadius: 15, // Rounded edges for the image
        }}
      />

      {/* Worker information container */}
      <View
        style={{
          marginTop: 7, // Space above worker info
          gap: 3, // Vertical spacing between text elements
        }}
      >
        
        {/* Worker name */}
        <Text
          style={{
            fontWeight: 700, // Bold font weight for worker name
            fontSize: 15, // Font size for worker name
            marginLeft: 3, // Slight left margin for alignment
          }}
        >
          {worker.name} {/* Displaying the worker's name */}
        </Text>
        
        {/* Worker city */}
        <Text
          style={{
            fontWeight: 400, // Regular font weight for city text
            fontSize: 12, // Font size for city
            color: Colors.GRAY, // Gray color for city text from Colors constant
            marginLeft: 3, // Left margin for alignment
          }}
        >
          {worker.city} {/* Displaying the worker's city */}
        </Text>
        
        {/* Bottom row containing rating and category */}
        <View
          style={{
            display: 'flex', // Enables flexbox layout
            flexDirection: 'row', // Positions items in a row
            justifyContent: "space-between", // Space between rating and category
          }}
        >
          {/* Rating section */}
          <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <Image 
              source={require('./../../assets/Images/star.png')} // Star icon for rating
              style={{
                width: 13, // Star icon width
                height: 13, // Star icon height
                marginTop: 2, // Slight top margin to align with text
              }}
            />
            <Text style={{
                fontWeight: '500', // Medium font weight for rating
                fontSize: 13, // Font size for rating
            }}>
              4.5 {/* Static rating value */}
            </Text>
          </View>

          {/* Category tag */}
          <Text style={{
            fontWeight: 500, // Medium font weight for category
            backgroundColor: Colors.PRIMARY, // Background color for category from Colors constant
            color: Colors.ICON_BG, // Text color from Colors constant
            padding: 3, // Padding around category text
            fontSize: 12, // Font size for category text
            borderRadius: 5, // Rounded edges for category tag
          }}>
            {worker.category} {/* Displaying the worker's category */}
          </Text>
        </View>
      </View>
    </View>
  );
}
