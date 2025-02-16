import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function ProduActImage({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const heartScale = useSharedValue(1);
  
  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }]
    };
  });
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    heartScale.value = withSpring(1.3, {}, () => {
      heartScale.value = withSpring(1);
    });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: product?.imageUrl }} 
        style={styles.productImage} 
        resizeMode="contain"
      />
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={toggleFavorite}
      >
        <Animated.View style={heartAnimatedStyle}>
          <AntDesign 
            name={isFavorite ? "heart" : "hearto"} 
            size={20} 
            color={isFavorite ? Colors.PRIMARY : "#fff"} 
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: width,
    height: width * 0.8,
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 30,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  }
});

