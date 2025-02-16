import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ToastAndroid } from 'react-native';
import { Colors } from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

export default function AddToCart({ product }) {
    const [quantity, setQuantity] = useState(1);
    const buttonScale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const addToCart = () => {
        // This would be replaced with actual cart functionality
        ToastAndroid.show(`Added ${quantity} item(s) to cart`, ToastAndroid.SHORT);
    };

    return (
        <View style={styles.container}>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                    style={[styles.quantityButton, quantity <= 1 && styles.disabledButton]}
                >
                    <AntDesign name="minus" size={16} color="#FFF" />
                </TouchableOpacity>

                <Text style={styles.quantityText}>{quantity}</Text>

                <TouchableOpacity
                    onPress={() => setQuantity(quantity + 1)}
                    style={styles.quantityButton}
                >
                    <AntDesign name="plus" size={16} color="#FFF" />
                </TouchableOpacity>
            </View>

            <Animated.View
                style={[
                    styles.buttonContainer,
                    { transform: [{ scale: buttonScale }] }
                ]}
            >
                <TouchableOpacity
                    onPress={addToCart}
                    style={styles.addToCartButton}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={0.8}
                >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        overflow: 'hidden',
    },
    quantityButton: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    disabledButton: {
        opacity: 0.6,
    },
    quantityText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        minWidth: 30,
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
    addToCartButton: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginLeft: 16,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});



