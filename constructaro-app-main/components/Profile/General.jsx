import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../configs/FireBaseConfig';
import { useRouter } from 'expo-router';

export default function General() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    router.push('/(auth)/login'); // Navigate to login screen
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Ensure UI updates after logout
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>General</Text>
      </View>

      <TouchableOpacity style={styles.generalText}>
        <Feather name="help-circle" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Help center</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.generalText}>
        <MaterialIcons name="business" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Constructaro for business</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.generalText}>
        <Feather name="file-text" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Terms & policies</Text>
      </TouchableOpacity>

      {user ? (
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
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
  generalText: {
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  icon: {
    marginLeft: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
  loginButton: {
    marginTop: 35,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 35,
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  logoutButton: {
    marginTop: 35,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 35,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
