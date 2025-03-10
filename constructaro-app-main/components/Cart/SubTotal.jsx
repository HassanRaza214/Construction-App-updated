import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function SubTotal({ cartTotal }) {
    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <View style={{ flex: 3, alignItems: 'flex-start' }}>
                    <Text style={styles.itemText}>SubTotal</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{cartTotal.totalAmount}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
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
        marginRight: 10,
    },
    itemText: {
        fontSize: 14,
        fontWeight:'bold',
        color: '#000',
    }
});