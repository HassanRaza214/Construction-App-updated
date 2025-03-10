
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
        const shopData = [];
        querySnapshot.forEach((doc) => {
            shopData.push({ id: doc.id, ...doc.data() });
        });
        setshopDetails(shopData);
    };

    const getProductsList = async () => {
        const q = query(collection(db, 'ItemsList'), where('shopName', '==', shopid));
        const querySnapshot = await getDocs(q);
        const productsData = [];
        querySnapshot.forEach((doc) => {
            productsData.push({ id: doc.id, ...doc.data() }); // Include document ID
        });
        setProducts(productsData); // Replace the state with the new array
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: shopid,
        });
        getshopDetail();
        getProductsList();
    }, []);

    // Function to format products into pairs for rendering
    const formatProductsForRendering = () => {
        const formattedProducts = [];
        for (let i = 0; i < products.length; i += 2) {
            formattedProducts.push(
                products.slice(i, i + 2)
            );
        }
        return formattedProducts;
    };

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
                <View style={{ backgroundColor: '#fff' }}>
                    <View style={{ paddingTop: 20,paddingLeft:20, paddingBottom:10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Products</Text>
                    </View>
                
                <FlatList
                    data={formatProductsForRendering()}
                    renderItem={({ item }) => (
                        <View style={styles.rowContainer}>
                            {item.map((product, index) => (
                                <ShopProducts
                                    key={product.id}
                                    products={product}
                                />
                            ))}
                        </View>
                    )}
                />
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
});