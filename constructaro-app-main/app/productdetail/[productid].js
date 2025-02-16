import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { db } from "../../configs/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Reviews from "../../components/Productdetail/Reviews";
import Header from "../../components/Productdetail/Header";
import Info from "../../components/Productdetail/Info";
import AddToCart from "../../components/Productdetail/AddToCart";
import ProductImage from "../../components/Productdetail/ProductImage";
import { Colors } from "../../constants/Colors";

export default function ProductDetailsScreen() {
  const { productid } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetProductdetailById();
  }, []);

  const GetProductdetailById = async () => {
    const docRef = doc(db, "ItemsList", productid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.log("No such document!");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header product={product} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProductImage product={product} />
        <Info product={product} />
        <Reviews product={product} />
      </ScrollView>
      <AddToCart product={product} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  }
});

