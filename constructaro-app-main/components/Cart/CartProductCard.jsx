import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db, auth } from "../../configs/FireBaseConfig";

export default function CartProductCard({ cart , refreshCart }) {
  const [productQuantity, setProductQuantity] = useState(cart.Quantity);
  const [productTotalPrice, setProductTotalPrice] = useState(cart.TotalPrice);

  const updateQuantityInDB = async (newQuantity) => {
    const user = auth.currentUser;
    if (!user) return;

    const cartItemRef = doc(db, `users/${user.uid}/cart`, cart.id);
    const cartTotalRef = doc(db, `users/${user.uid}/cartTotals`, 'total');

    try {
        // Fetch current cart total from Firestore
        const cartTotalSnap = await getDoc(cartTotalRef);
        let currentCartTotal = cartTotalSnap.exists() ? cartTotalSnap.data().totalAmount : 0;

        let priceDifference = (newQuantity - productQuantity) * cart.Price;

        if (newQuantity === 0) {
            await deleteDoc(cartItemRef);
            priceDifference = -productTotalPrice; // Remove the total price of the deleted item
        } else {
            await updateDoc(cartItemRef, { 
                Quantity: newQuantity, 
                TotalPrice: newQuantity * cart.Price 
            });
        }

        // Update cart total
        await updateDoc(cartTotalRef, {
            totalAmount: currentCartTotal + priceDifference
        });

        setProductQuantity(newQuantity);
        setProductTotalPrice(newQuantity * cart.Price);
        refreshCart(); // Ensure UI updates
    } catch (error) {
        console.error('Error updating quantity and cart total:', error);
    }
};


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: cart?.Image }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{cart.ProductName}</Text>
        <Text style={styles.shopName}>{cart.ShopName}</Text>
        <View style={styles.bottomRow}>
          <View style={styles.quantityContainer}>
            {productQuantity === 1 ? (
              <TouchableOpacity style={styles.iconButton} onPress={() => updateQuantityInDB(0)}>
                <Ionicons name="trash-outline" size={18} color="gray" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => updateQuantityInDB(productQuantity - 1)}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.quantityNumber}>{productQuantity}</Text>

            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => updateQuantityInDB(productQuantity + 1)}
            >
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
    backgroundColor: '#fff'
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    resizeMode: 'contain'
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
