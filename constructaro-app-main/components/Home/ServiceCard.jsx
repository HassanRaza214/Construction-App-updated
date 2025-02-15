import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function ServiceCard({ backgroundColor, icon, title, subtitle, onPress }) {
      return (
        <TouchableOpacity 
          style={[styles.card]}
          onPress={onPress}
        >
          {icon}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    const styles = StyleSheet.create({
        card: {
          width: '48%',
          borderRadius: 12,
          padding: 16,
          aspectRatio: 1.5,
          justifyContent: 'center',
          shadowColor: '#000',
            shadowOffset: {
            width: 0,
            height: 1,
            },
            shadowOpacity: 0.08,
            shadowRadius: 2,
            elevation: 2,
            borderWidth: 1,
            backgroundColor:"#fff",
            borderColor:Colors.PRIMARY
        },
        icon: {
          marginBottom: 12,
        },
        textContainer: {
          justifyContent: 'flex-end',
        },
        title: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 4,
        },
        subtitle: {
          fontSize: 14,
          opacity: 0.9,
        },
      });