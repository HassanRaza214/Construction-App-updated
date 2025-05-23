import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from "../../configs/FireBaseConfig";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import Header from '../../components/Cart/Header';
import CartProductCard from '../../components/Cart/CartProductCard';
import { useRouter } from 'expo-router';
import Products from '../../components/Cart/Products';
import { Colors } from '../../constants/Colors';
import Total from '../../components/Cart/Total';
import SubTotal from '../../components/Cart/SubTotal';
import CheckOutButton from '../../components/Cart/CheckOutButton';

export default function CartScreen() {
  const [cart, setCart] = useState([]);
  const [product, setproduct] = useState([]);
  const router = useRouter()
  const [cartTotal, setCartTotal] = useState({ totalAmount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const user = auth.currentUser;
      if (!user) {
          setLoading(false);
          return;
      }

      const cartDocRef = doc(db, `users/${user.uid}/cartTotals`, 'total');
      const unsubscribe = onSnapshot(cartDocRef, (docSnap) => {
          if (docSnap.exists()) {
              setCartTotal(docSnap.data());
          } else {
              setCartTotal({ totalAmount: 0 });
          }
          setLoading(false);
      }, (error) => {
          console.error("Error fetching cart total:", error);
          setCartTotal({ totalAmount: 0 });
          setLoading(false);
      });

      return () => unsubscribe();
  }, []);

  useEffect(() => {
    getCartData();
    getproduct();
  }, []);

  const user = auth.currentUser;

  const getCartData = async () => {
    const q = collection(db, `users/${user.uid}/cart`);
    const querySnapshot = await getDocs(q);
    const cartData = [];
    querySnapshot.forEach((doc) => {
      cartData.push({ id: doc.id, ...doc.data() });
    });
    setCart(cartData);
  };

  const getproduct = async () => {
    const querySnapshot = await getDocs(collection(db, 'ItemsList'));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    setproduct(products)
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Header />
        
        {/* Cart Items List */}
<FlatList
  data={cart}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <CartProductCard cart={item} refreshCart={getCartData} />}
  scrollEnabled={false}
  listKey="cartItems"
/>


        <View style={styles.container}>
          <TouchableOpacity onPress={() => { router.back(); }}>
            <Text style={styles.Text}>+ Add More Items</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Products */}
        <View style={{ marginTop: 10 }}>
          <View style={styles.container}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15, marginTop: 10 }}>
              Popular with your order
            </Text>
            <Text style={{ fontSize: 14, color: Colors.GRAY, marginLeft: 15, marginBottom: 10 }}>
              Other customers also bought these
            </Text>
            <FlatList
              data={product}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Products product={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              listKey="popularProducts"
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
            />
          </View>
        </View>

        {/* Cart Summary */}
        <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
          <View style={styles.container}>
            <View style={styles.head}>
              <View style={{ flex: 2, alignItems: 'flex-start' }}>
                <Text style={styles.headText}>Products</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={styles.headText}>Quantity</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={styles.headText}>Amount</Text>
              </View>
            </View>

            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Total cart={item} />}
              scrollEnabled={false}
              listKey="cartSummary"
            />
          </View>
        </View>

        {/* SubTotal */}
        <SubTotal cartTotal={cartTotal}/>
      </ScrollView>
      <View>
        <CheckOutButton cartTotal={cartTotal}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  Text: {
    fontSize: 13,
    padding: 12,
    color: '#000',
    fontWeight: 'bold'
  },
  head: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingVertical: 10
  },
  headText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  headRight: {
    flexDirection: 'row',
    marginHorizontal: 20,
  }
});