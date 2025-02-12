import React ,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from "../../constants/Colors";
import { auth } from '../../configs/FireBaseConfig';


export default function ProfileHeader() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      // Get the current user from Firebase Auth
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
      });
  
      return unsubscribe;
    }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Text style={styles.name}>{user?.displayName || "User Name"}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuContent}>
              <Feather name="file-text" size={22} color="#666" />
              <Text style={styles.menuText}>Orders</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuContent}>
              <Feather name="heart" size={22} color="#666" />
              <Text style={styles.menuText}>Favourites</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuContent}>
              <Feather name="map-pin" size={22} color="#666" />
              <Text style={styles.menuText}>Addresses</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Pandapay Credit */}
        <TouchableOpacity style={styles.creditCard}>
          <View style={styles.creditContent}>
            <View style={styles.creditIconContainer}>
              <View style={styles.creditIcon}>
                <Text style={styles.pandaIcon}>C</Text>
              </View>
            </View>
            <View style={styles.creditTextContainer}>
              <Text style={styles.creditText}>Constructaro Credit</Text>
              <Text style={styles.creditAmount}>Rs. 0.00</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom:30
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
    fontWeight:'bold',
    paddingTop:30
  },
  content: {
    paddingTop: 8,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  menuItem: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  menuContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    marginTop: 8,
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
  creditCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  creditContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  creditIconContainer: {
    marginRight: 12,
  },
  creditIcon: {
    width: 32,
    height: 32,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pandaIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  creditTextContainer: {
    flex: 1,
  },
  creditText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  creditAmount: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});