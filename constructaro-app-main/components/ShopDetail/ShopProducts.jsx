import { FlatList, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Products({ products }) {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={{ 
        backgroundColor: '#f2f2f2', 
        borderRadius: 10, 
        padding: 12, 
        width: '48%', 
        marginBottom: 16 
      }}
      onPress={() => router.push('/productdetail/' + products.id)}
    >
      <Image 
        source={{ uri: products.imageUrl }} 
        style={{ 
          width: '100%', 
          height: 150, 
          resizeMode: 'contain', 
          borderRadius: 10 
        }} 
      />
      <View style={{ marginTop: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
          {products.name}
        </Text>
        <Text style={{ fontSize: 14, color: '#666' }}>
          RS.{products.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}