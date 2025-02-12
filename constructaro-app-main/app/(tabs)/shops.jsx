import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import SearchBar from '../../components/Shops/SearchBar';
import PopularShops from '../../components/Home/PopularShops';
import Products from '../../components/Shops/Products';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import { Colors } from '../../constants/Colors';

export default function Shops() {
    const [productsList, setproductsList] = useState([]);
    const [filteredproducts, setFilteredproducts] = useState([]);
    const [loading, setLoading] = useState(false);
  
    // Fetch all products initially
    useEffect(() => {
        const fetchAllproducts = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, 'ItemsList'));
                const products = [];
                querySnapshot.forEach((doc) => {
                    products.push({ id: doc.id, ...doc.data() });
                });
                setproductsList(products);
                setFilteredproducts(products);
            } catch (error) {
                console.error('Error fetching all products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllproducts();
    }, []);

    const renderProductCard = ({ item }) => <Products products={item} />;

    return (
        <View style={styles.container}>
            {/* Header and Search Bar */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Shop</Text>
            </View>
            <View style={styles.headerContainer}>
                <SearchBar 
                    productsList={productsList} 
                    onSearch={(filteredList) => setFilteredproducts(filteredList)} 
                />
            </View>

            {/* FlatList handles scrolling */}
            {loading ? (
                <ActivityIndicator size="large" color={Colors.PRIMARY} style={styles.loader} />
            ) : (
                <FlatList
                    data={filteredproducts}
                    renderItem={renderProductCard}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No products found</Text>
                        </View>
                    )}
                    ListHeaderComponent={() => (
                        <>
                            <PopularShops />
                            <View style={styles.sectionTitle}>
                                <Text style={styles.title}>Products</Text>
                            </View>
                        </>
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        paddingHorizontal: 15,
        padding: 20
    },
    listContainer: {
        paddingBottom: 20,
    },
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
    sectionTitle: {
        padding: 20,
        paddingBottom: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
    },
    loader: {
        marginTop: 20,
    },
});


