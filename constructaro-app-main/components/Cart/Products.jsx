import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';

export default function Products({ product }) {
  return (
    <View>
  <TouchableOpacity
    key={product.id}
    style={{
      alignItems: 'center',
      padding: 10,
      width: 110,
      marginRight: 15,  // Add space between items horizontally
      marginBottom: 10,  // Space below each item
    }}
    onPress={() => router.push('/productdetail/' + product.id)}
  >
    {/* Product Image */}
    <Image
      source={{ uri: product.imageUrl }}
      style={{
        width: 90,
        height: 90,
        borderRadius: 10,
        marginBottom: 8,
        resizeMode:'contain'
      }}
    />

    {/* Product Name */}
    <Text
      style={{
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
      }}
      numberOfLines={2}
    >
      {product.name}
    </Text>

    {/* Product Price */}
    <Text
      style={{
        fontSize: 14,
        color: Colors.GRAY,
        marginTop: 4,
      }}
    >
      Rs. {product.price}
    </Text>
  </TouchableOpacity>
</View>

  );
}
