import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function Products({ product }) {
  return (
    <View style={styles.container}>
          <Text style={styles.title}>Products</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product?.imageUrl }}
          style={styles.image}
          resizeMode='contain'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: '48%',
    height: 130,
    marginBottom: 12,
    borderRadius: 15
  },
  separator: {
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    marginVertical: 16,
  },
});

