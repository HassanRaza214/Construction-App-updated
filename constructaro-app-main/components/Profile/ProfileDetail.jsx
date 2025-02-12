import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function ProfileDetail() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Details</Text>
      </View>

        <TouchableOpacity style={styles.creditCard}>
          <View style={styles.creditContent}>
            <View style={styles.creditTextContainer}>
              <Text style={styles.creditText}>Name</Text>
              <Text style={styles.creditAmount}>Muhammad Hassan Raza</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.creditCard}>
          <View style={styles.creditContent}>
            <View style={styles.creditTextContainer}>
              <Text style={styles.creditText}>Email</Text>
              <Text style={styles.creditAmount}>testemail@gmail.com</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.creditCard}>
          <View style={styles.creditContent}>
            <View style={styles.creditTextContainer}>
              <Text style={styles.creditText}>Mobile Number</Text>
              <Text style={styles.creditAmount}>+923121234567</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 20,
    fontWeight:'bold',
  },
  creditCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    margin:8
  },
  creditContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  creditTextContainer: {
    flex: 1,
  },
  creditText: {
    fontSize: 15,
    fontWeight: '00',
  },
  creditAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    color: 'black'
  },
});