import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function ProductInfo({ product }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      
      <View style={styles.ratingContainer}>
        <AntDesign name="star" size={18} color="#FFD700" />
        <Text style={styles.rating}>
          {product.rating || '4.5'} 
          <Text style={styles.ratingCount}>
            ({product.reviewCount || product.reviews?.length || '42'} reviews)
          </Text>
        </Text>
      </View>
      
      <Text style={styles.price}>Rs.{product.price?.toLocaleString() || '0'}</Text>
      
      <View style={styles.divider} />
      
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.description}>{product.detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 6,
    color: '#333',
  },
  ratingCount: {
    fontSize: 14,
    color: '#777',
    fontWeight: 'normal',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
});

