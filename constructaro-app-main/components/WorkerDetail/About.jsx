import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react';


export default function About({ worker }) {
    return (
        <View>
            <View style={{
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>{worker.category}</Text>
                <Text style={{
                    fontSize: 15,
                    color: '#666',
                    lineHeight: 22,
                    marginTop: 10
                }}>{worker.about}</Text>
            </View>
            <View style={styles.separator} />
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
      borderBottomColor: '#e0e0e0',
      borderBottomWidth: 1,
      marginVertical: 16,
    },
  });