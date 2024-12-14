import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function ShopHeader({ shop }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Image Section */}
                <Image 
                    source={{ uri: shop?.imageUrl }} 
                    style={styles.image} 
                />

                {/* Text Section */}
                <View style={styles.textContainer}>
                    <Text style={styles.shopName}>{shop?.name || 'Shop Name'}</Text>
                    <Text style={styles.freeDelivery}>Free delivery on first shop order</Text>
                    <Text style={styles.minPrice}>Min Rs. {shop?.minPrice || '249.00'}</Text>

                </View>

            </View>
            <Text style={styles.deliveryTime}>Delivery: {shop?.deliveryTime || '25–40 min'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row', // Align image and text horizontally
        alignItems: 'center', // Center items vertically
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.GRAY,
    },
    textContainer: {
        marginLeft: 12, // Space between image and text
        flex: 1, // Ensure the text container takes remaining space
    },
    shopName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    freeDelivery: {
        fontSize: 14,
        color: Colors.PRIMARY,
        marginVertical: 2,
    },
    minPrice: {
        fontSize: 14,
        color: '#666',
    },
    deliveryTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 4,
    },
});
