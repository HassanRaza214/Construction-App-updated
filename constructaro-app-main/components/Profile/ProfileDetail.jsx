import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth, db } from "../../configs/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ProfileDetail() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get the current user from Firebase Auth
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        await getUserData(currentUser.uid);
      } else {
        // Clear user data when logged out
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  const getUserData = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      } else {
        console.log("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Details</Text>
      </View>

      {/* User Details */}
      <TouchableOpacity style={styles.creditCard}>
        <View style={styles.creditContent}>
          <View style={styles.creditTextContainer}>
            <Text style={styles.creditText}>Name</Text>
            <Text style={styles.creditAmount}>{user?.displayName || "Not Provided"}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.creditCard}>
        <View style={styles.creditContent}>
          <View style={styles.creditTextContainer}>
            <Text style={styles.creditText}>Email</Text>
            <Text style={styles.creditAmount}>{user?.email || "Not Provided"}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.creditCard}>
        <View style={styles.creditContent}>
          <View style={styles.creditTextContainer}>
            <Text style={styles.creditText}>Mobile Number</Text>
            <Text style={styles.creditAmount}>{userData?.phoneNumber || "Not Provided"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  creditCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    margin: 8,
  },
  creditContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  creditTextContainer: {
    flex: 1,
  },
  creditText: {
    fontSize: 15,
    fontWeight: '500',
  },
  creditAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    color: 'black',
  },
});