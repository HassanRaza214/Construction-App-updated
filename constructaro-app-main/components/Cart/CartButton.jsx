import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { auth, db } from "../../configs/FireBaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import Feather from '@expo/vector-icons/Feather';

export default function CartButton() {
    const router = useRouter();
    const [cartTotal, setCartTotal] = useState({ totalAmount: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            setLoading(false);
            return;
        }

        const cartDocRef = doc(db, `users/${user.uid}/cartTotals`, 'total');

        // Set up Firestore real-time listener
        const unsubscribe = onSnapshot(cartDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setCartTotal(docSnap.data());
            } else {
                setCartTotal({ totalAmount: 0 }); // Default value
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching cart total:", error);
            setCartTotal({ totalAmount: 0 });
            setLoading(false);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.innerContainer}
                onPress={() => router.push('/cartDetail/cart')}
            >
                <View style={styles.iconContainer}>
                    <Feather name="shopping-bag" size={24} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.viewText}>View your cart</Text>
                    <Text style={styles.subText}></Text>
                </View>
                <View style={styles.priceContainer}>
                    {loading ? (
                        <Text style={styles.priceText}>...</Text>
                    ) : (
                        <Text style={styles.priceText}>{cartTotal?.totalAmount || 0}</Text>
                    )}
                </View>
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
    innerContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        paddingVertical: 6,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 12,
        alignItems: 'center',
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
