import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import RecentPosts from '../../components/JobPost/RecentPost'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { router } from 'expo-router'

export default function postajob() {
  return (
    <View style={styles.Container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Recent Jobs</Text>
            </View>
      <View style={styles.PostsContainer}>
        <RecentPosts/>
      </View>
      <TouchableOpacity 
        style={styles.Button} 
        onPress={() => {router.push('/jobpost/postAJob')}}
      >
        <Text style={styles.ButtonText}>Post a Job</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  PostsContainer: {
    flex: 1, // This will allow the Posts to take up available space
  },
  Button: {
    marginTop: 35,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 35,
    marginBottom: 20,
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 20
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
    fontWeight: 'bold',
    paddingTop: 30
},
})