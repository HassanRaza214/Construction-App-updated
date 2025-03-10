import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
export default function Address() {
    const [changeIssues, setChangeIssues] = useState(false);

    return (
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Delivery address</Text>
  
        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 24.8970,
              longitude: 67.1371,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{ latitude: 24.8970, longitude: 67.1371 }}
              title="Delivery Location"
            />
          </MapView>
        </View>
  
        {/* Address Details */}
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Home</Text>
          <Text style={styles.addressText}>
            ATM Bank AL Habib University Road{'\n'}Karachi
          </Text>
  
          <TextInput
            style={styles.input}
            placeholder="Delivery instructions/Alternate phone number"
          />
        </View>
  
        {/* Change Issues Toggle */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            Change issues? You can ask the rider to top-up your wallet.
          </Text>
          <Switch value={changeIssues} onValueChange={setChangeIssues} />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 10,
      margin: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    mapContainer: {
      height: 150,
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 10,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    addressContainer: {
      marginBottom: 15,
    },
    addressTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    addressText: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      fontSize: 14,
      backgroundColor: '#f9f9f9',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
    switchText: {
      fontSize: 14,
      flex: 1,
    },
  });
  