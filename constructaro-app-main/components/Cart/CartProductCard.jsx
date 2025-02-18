import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Importing icons for trash and quantity buttons

export default function CartProductCard({ cart }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: cart?.Image }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{cart.ProductName}</Text>
        <Text style={styles.shopName}>{cart.ShopName}</Text>
        <View style={styles.bottomRow}>
        <View style={styles.quantityContainer}>
        {cart.Quantity === 1 ? (
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="trash-outline" size={18} color="gray" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.quantityNumber}>{cart.Quantity}</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>Rs. {cart.TotalPrice}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor:'#fff'
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    resizeMode:'contain'
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shopName: {
    fontSize: 14,
    color: 'gray',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  iconButton: {
    padding: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  quantityButton: {
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityNumber: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
});
