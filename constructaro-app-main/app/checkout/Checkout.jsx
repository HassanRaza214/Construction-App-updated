import Address from "../../components/Checkout/Address";
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../components/Checkout/Header";
import SubTotal from "../../components/Cart/SubTotal";
import { auth, db } from "../../configs/FireBaseConfig";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import Total from "../../components/Cart/Total";
import PlaceOrderButton from "../../components/Checkout/PlaceOrderButton";

export default function Checkout() {

  const [cartTotal, setCartTotal] = useState({ totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

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


  return (
    <View style={{flex:1}}>
    <ScrollView style={{backgroundColor:'#fff'}}>
      <Header />
      <Address />
      <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingHorizontal:15, borderRadius:10 }}>
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
      <View style={{paddingHorizontal:15}}>
      <SubTotal cartTotal={cartTotal} />
      </View>
      
    </ScrollView>
    <View>
    <PlaceOrderButton cartTotal={cartTotal}/>
    </View>
    </View>
  );
};

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
})