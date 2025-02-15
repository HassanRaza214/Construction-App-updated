import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons,MaterialCommunityIcons  } from '@expo/vector-icons';
import ServiceCard from './ServiceCard';
import React from 'react';
import { useRouter } from 'expo-router';

export default function ServiceMenu() {

      const router = useRouter();


    return (
        <View style={styles.container}>
          <View style={styles.row}>
            <ServiceCard
              icon={<FontAwesome name="wrench" size={24} color="black" style={styles.icon} />}
              title="Hire Workers"
              subtitle="Find skilled labor"
              onPress={() => {router.push('/hire/'); }}
            />
            <ServiceCard
              icon={<MaterialIcons name="shopping-bag" size={24} color="black" style={styles.icon} />}
              title="Buy Materials"
              subtitle="Shop supplies"
              onPress={() => {router.push('/shops/')}}
            />
          </View>
          <View style={styles.row}>
            <ServiceCard
          icon={<MaterialCommunityIcons name="clipboard-text-outline" size={24} color="black" style={styles.icon} />}
          title="Post a Job"
          subtitle="Find contractors"
              onPress={() => {router.push('/jobpost/postAJob')}}
            />
            <ServiceCard
              icon={<Ionicons name="flash" size={24} color="black" style={styles.icon} />}
              title="Urgent Service"
              subtitle="Quick assistance"
              onPress={() => console.log('Urgent Service pressed')}
            />
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        padding: 16,
        alignItems: 'center',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
      },
    });