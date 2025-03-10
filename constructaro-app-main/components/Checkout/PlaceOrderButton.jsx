import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function PlaceOrderButton({cartTotal}) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.totalText}>Total <Text style={styles.subText}>(incl. fees and tax)</Text></Text>
          <Text style={styles.summaryText}>See summary</Text>
        </View>
        <Text style={styles.amountText}>Rs. {cartTotal.totalAmount}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 13,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: 'gray',
  },
  summaryText: {
    fontSize: 12,
    color: Colors.GRAY,
    textDecorationLine: 'underline',
    marginTop: 2,
  },
  amountText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor:Colors.PRIMARY,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});