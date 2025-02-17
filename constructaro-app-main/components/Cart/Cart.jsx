import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function Cart() {
    const router=useRouter();
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.innerContainer}
    onPress={() => {router.push('/cartDetail/cart')}}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>1</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.viewText}>View your cart</Text>
        <Text style={styles.subText}>OPTP - Bahudurabad</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Rs. 650.00</Text>
      </View>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding:13,
        backgroundColor:'#fff',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 400,
    },
    innerContainer: {
      flexDirection: 'row',
      backgroundColor: Colors.PRIMARY,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 14,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    iconContainer: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconText: {
      color: '#E91E63',
      fontSize: 14,
      fontWeight: 'bold',
    },
    textContainer: {
      flex: 1,
      paddingHorizontal: 12,
    },
    viewText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    subText: {
      color: '#fff',
      fontSize: 12,
      opacity: 0.8,
    },
    priceContainer: {
      paddingLeft: 12,
    },
    priceText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });