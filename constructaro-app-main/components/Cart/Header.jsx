import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Cart</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    padding:16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
  },
})