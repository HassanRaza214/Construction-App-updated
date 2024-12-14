import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, limit, query, where } from "firebase/firestore"; // Firebase Firestore functions
import { db } from "../../configs/FireBaseConfig"; // Firebase database configuration
import ShopHeader from '../../components/ShopDetail/ShopHeader';
import Products from '../../components/ShopDetail/ShopProducts';

export default function ProductsListByShop() {
    const { shopid } = useLocalSearchParams();
    const navigation = useNavigation();
    const [shopDetails, setshopDetails] = useState([]);
    const [products, setProducts] = useState([]);

    const getshopDetail = async () => {
        const q = query(collection(db, 'ShopsList'), where('name', '==', shopid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setshopDetails(prev => [...prev, doc.data()])
        })
    }

    const getProductsList = async () => {
        const q = query(collection(db, 'ItemsList'), where('shopName', '==', shopid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setProducts(prev => [...prev, doc.data()])
        })
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: shopid,

        });
        getshopDetail();
        getProductsList();
    }, []);


    return (

        <View>
            <FlatList
                data={shopDetails}
                renderItem={({ item, index }) => (
                    <ShopHeader
                        shop={item}
                        key={index}
                    />
                )}
            />
            <FlatList
                data={products}
                renderItem={({ item, index }) => (
                    <Products
                        product={item}
                        key={index}
                    />
                )}
            />
        </View>
    );
}

