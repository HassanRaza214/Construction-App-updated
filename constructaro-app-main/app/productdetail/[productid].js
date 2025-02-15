import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { db } from "../../configs/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import Reviews from "../../components/Productdetail/Reviews";
import Header from "../../components/Productdetail/Header";

export default function ProductDetailsScreen() {
  const { productid } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

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
    return <ActivityIndicator size="large" color="#000" style={styles.loader} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header product={product}/>
      <ScrollView>
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
        <View style={styles.header}>
          <Text style={styles.headerText}>{product.name}</Text>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <AntDesign name={isFavorite ? "heart" : "hearto"} size={24} color={isFavorite ? "red" : "black"} />
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>Rs.{product.price}</Text>
        <Text style={styles.description}>{product.detail}</Text>
        <Reviews product={product}/>
      </ScrollView>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode:'contain'
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
    paddingTop: 30,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    marginTop: 5,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: "gray",
    paddingHorizontal: 16,
  },
  addToCartButton: {
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 16,
  },
  addToCartText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});
