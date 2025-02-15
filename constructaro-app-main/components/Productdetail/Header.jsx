import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Header({product}) {
  return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{product.shopName}</Text>
            </View>
  )
}

const styles=StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 30
    },
})