import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Total({ cart }) {
  
  return (
    <View style={styles.itemContainer}>
      <View style={{ flex: 2, alignItems: 'flex-start' }}>
        <Text style={styles.itemText}>{cart.ProductName}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>{cart.Quantity}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>{cart.TotalPrice}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  item: {
    flex: 1, // Each item (Product, Quantity, Price) takes equal space
    justifyContent: 'center',
    alignItems: 'center', // Align text to the start
    marginRight:10,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  }
});
