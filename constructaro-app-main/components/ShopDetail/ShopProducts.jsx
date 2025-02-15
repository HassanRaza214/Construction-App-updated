import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Products({ products }) {
  return (
    <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Products</Text>
        <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 12 }}>
          {products.map((product) => (
            <View key={product.id} style={{ backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12, width: '48%', marginBottom: 16 }}>
              <Image source={{ uri: product.imageUrl }} style={{ width: '100%', height: 150, resizeMode: 'contain', borderRadius: 10 }} />
              <View style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>{product.name}</Text>
                <Text style={{ fontSize: 14, color: '#666' }}>RS.{product.price}</Text>
              </View>
            </View>
          ))}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}