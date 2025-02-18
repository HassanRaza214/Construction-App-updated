import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ToastAndroid } from 'react-native';
import { Colors } from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { setDoc, getDoc, updateDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { auth } from '../../configs/FireBaseConfig';

export default function AddToCart({ product }) {
    const [quantity, setQuantity] = useState(1);
    const buttonScale = useRef(new Animated.Value(1)).current;
    const router = useRouter();
    const [cartTotal, setCartTotal] = useState(0);
    
    const user = auth.currentUser;

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
    

    const addToCart = async () => {
        try {
            if (!user) {
                ToastAndroid.show('User not authenticated', ToastAndroid.BOTTOM);
                return;
            }
            
            // Reference to the specific product in the user's cart
            const productCartRef = doc(db, `users/${user.uid}/cart`, product.id);
            
            // Check if this product already exists in the cart
            const productDoc = await getDoc(productCartRef);
            
            let newTotalCartPrice = cartTotal; // Start with the current total
    
            if (productDoc.exists()) {
                // Product exists in cart, update quantity
                const currentQuantity = productDoc.data().Quantity;
                const newQuantity = currentQuantity + quantity;
                const newTotalPrice = newQuantity * product.price;
    
                await updateDoc(productCartRef, {
                    Quantity: newQuantity,
                    TotalPrice: newTotalPrice,
                });
    
                // Update total cart price
                newTotalCartPrice += quantity * product.price;
            } else {
                // Product doesn't exist in cart, add it
                const totalPrice = quantity * product.price;
                await setDoc(productCartRef, {
                    ProductId: product.id,
                    ProductName: product.name,
                    ShopName: product.shopName,
                    Quantity: quantity,
                    DateAdded: new Date(),
                    Price: product.price,
                    TotalPrice: totalPrice,
                    Image:product.imageUrl
                });
    
                // Update total cart price
                newTotalCartPrice += totalPrice;
            }
    
            // Save updated total cart price inside user's document in "cartTotals" collection
            const cartTotalsRef = doc(db, `users/${user.uid}/cartTotals`, 'total');
            await setDoc(cartTotalsRef, { 
                totalAmount: newTotalCartPrice,
                lastUpdated: new Date()
            }, { merge: true });
    
            // Also update the user document for backward compatibility
            const userDocRef = doc(db, `users/${user.uid}`);
            await updateDoc(userDocRef, { TotalCartPrice: newTotalCartPrice });
    
            // Update UI state
            setCartTotal(newTotalCartPrice);
    
            ToastAndroid.show('Product Added...', ToastAndroid.BOTTOM);
        } catch (error) {
            console.error('Error Adding Product:', error);
            ToastAndroid.show('Failed to Add Product', ToastAndroid.BOTTOM);
        }
    };
    

    const calculateTotalCartPrice = async () => {
        try {
            const cartTotalRef = doc(db, `users/${user.uid}/cartTotals`, 'total');
            const cartTotalDoc = await getDoc(cartTotalRef);
            
            if (cartTotalDoc.exists() && cartTotalDoc.data().totalAmount !== undefined) {
                return cartTotalDoc.data().totalAmount;
            }
    
            // Fallback: Calculate from cart items
            const cartRef = collection(db, `users/${user.uid}/cart`);
            const cartSnapshot = await getDocs(cartRef);
    
            let totalCartPrice = 0;
            cartSnapshot.forEach((doc) => {
                totalCartPrice += doc.data().TotalPrice || 0;
            });
    
            // Update the new collection inside user's document
            await setDoc(cartTotalRef, { 
                totalAmount: totalCartPrice,
                lastUpdated: new Date()
            }, { merge: true });
    
            return totalCartPrice;
        } catch (error) {
            console.error("Error calculating cart total:", error);
            return 0;
        }
    };
    


    useEffect(() => {
        const fetchTotalPrice = async () => {
            const total = await calculateTotalCartPrice();
            setCartTotal(total);
        };

        fetchTotalPrice();
    }, []);
    


    // Calculate total price based on quantity
    const totalPrice = product.price * quantity;

    return (
        <View style={styles.container}>
            <Text style={styles.priceText}>Rs.{totalPrice.toFixed(2)}</Text>
            <View style={styles.leftContainer}>
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
            </View>

            <Animated.View
                style={[
                    styles.buttonContainer,
                    { transform: [{ scale: buttonScale }] }
                ]}
            >
                <TouchableOpacity
                    onPress={() => {
                        addToCart(); 
                        router.back();
                    }}
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
    leftContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 4,
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
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        padding:10
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