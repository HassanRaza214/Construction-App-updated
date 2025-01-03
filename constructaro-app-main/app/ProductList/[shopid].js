import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, limit, query, where } from "firebase/firestore"; // Firebase Firestore functions
import { db } from "../../configs/FireBaseConfig"; // Firebase database configuration
import ShopHeader from '../../components/ShopDetail/ShopHeader';
import ShopProducts from '../../components/ShopDetail/ShopProducts';

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

        <View style={{flex:1}}>
            <View style={{flex:1}}>
            <FlatList
                data={shopDetails}
                renderItem={({ item, index }) => (
                    <ShopHeader
                        shop={item}
                        key={index}
                    />
                )}
            />
            </View>
            <View style={{flex:5}}>
            <ShopProducts products={products}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    image: {
      width: '48%',
      height: 130,
      marginBottom: 12,
      borderRadius:15
    },
    separator: {
      borderBottomColor: '#e0e0e0',
      borderBottomWidth: 1,
      marginVertical: 16,
    },
  });
  

