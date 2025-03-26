import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Address() {
    const [changeIssues, setChangeIssues] = useState(false);
    const [mapError, setMapError] = useState(false);
    const [location, setLocation] = useState(null);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setPermissionGranted(false);
                Alert.alert("Permission Denied", "Location permission is required to show your location on the map.");
                return;
            }
            setPermissionGranted(true);
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Delivery Address</Text>
            
            <View style={styles.mapContainer}>
                {permissionGranted && location ? (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        onError={() => setMapError(true)}
                    >
                        <Marker
                            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                            title="Your Location"
                        />
                    </MapView>
                ) : (
                    <View style={styles.blankCard}>
                        <Text style={styles.blankText}>Location not available</Text>
                    </View>
                )}
            </View>

            <View style={styles.addressContainer}>
                <Text style={styles.addressTitle}>Home</Text>
                <Text style={styles.addressText}>ATM Bank AL Habib University Road, Karachi</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Delivery instructions/Alternate phone number"
                />
            </View>

            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Change issues? You can ask the rider to top-up your wallet.</Text>
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
    blankCard: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    blankText: {
        color: 'gray',
        fontSize: 16,
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
