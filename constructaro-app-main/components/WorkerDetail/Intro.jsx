import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Intro({ worker }) {

  const router = useRouter()

  return (
    <ScrollView style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <View style={{
        position: 'absolute',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        flex: 1
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={35} color="black" />
        </TouchableOpacity>

        <Ionicons name="heart-outline" size={35} color="black" />
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 70,
      }}>
        <Image source={{ uri: worker?.imageUrl }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 99,
            borderWidth: 2,
            marginLeft: 20,
          }} />
        <View style={{
          display: 'flex',
          flex: 1,
          gap: 5,
          marginLeft: 10,
          justifyContent: 'center'
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{worker.name}</Text>
          <Text style={{ fontSize: 15, fontWeight: 400, color: '#666', }}>{worker.city}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <Image
              source={require('./../../assets/Images/star.png')} // Star icon for rating
              style={{
                width: 13, // Icon width
                height: 13, // Icon height
                marginTop: 2, // Top margin to align with text
              }}
            />
            <Text style={{
              fontWeight: '500', // Medium font weight for rating
              fontSize: 13, // Font size for rating text

              color: '#666',
            }}>
              4.5 {/* Static rating value */}
            </Text>
          </View>
        </View>
      </View>
      </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,

  },
  statContainer: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 15,
    color: '#666',
  },
  separator: {
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    marginVertical: 16,
  },
});

