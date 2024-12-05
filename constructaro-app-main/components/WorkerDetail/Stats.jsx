import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react';

export default function Stats({worker}) {
  return (
    <View>
            <View style={styles.separator} />
      <View style={styles.container}>
        <View style={styles.statContainer}>
          <Text style={styles.statValue}>RS.{worker.totalEarnings}+</Text>
          <Text style={styles.statLabel}>Total earnings</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statValue}>{worker.totalJobs}</Text>
          <Text style={styles.statLabel}>Total jobs</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statValue}>{worker.totalDays}</Text>
          <Text style={styles.statLabel}>Total hours</Text>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
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
  