import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function JobPostingCard  ({proposal})  {
  return (
    <View style={styles.container}>
      {/* Header section with timestamp and actions */}
      <View style={styles.header}>
      <Text style={styles.jobTitle}>{proposal.JobTitle}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="thumb-down-outline" size={22} color="black"  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="heart-outline" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Job title */}
      

      {/* Job details */}
      <Text style={styles.jobDetails}>
        {proposal.PriceBase} - {proposal.JobLevel} 
      </Text>

      {/* Job description */}
      <Text style={styles.jobDescription}>
        {proposal.JobDescription}
      </Text>

      {/* Skills tags */}
      <View style={styles.skillsContainer}>
        <View style={styles.skillTag}>
          <Text style={styles.skillText}>{proposal.Skills}</Text>
        </View>
      </View>

      {/* Client info */}
      <View style={styles.clientInfoRow}>
        <Text style={styles.clientSpent}>$20K+ spent</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>{proposal.Area}</Text>
        </View>
      </View>

      {/* Proposals count */}
      <Text style={styles.proposals}>Proposals Recieved: {proposal.Proposals}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: 600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 13,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 16,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 6,
  },
  jobDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  jobDescription: {
    fontSize: 15,
    color: '#333',
    marginBottom: 14,
    lineHeight: 22,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  skillTag: {
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#333',
    fontSize: 13,
  },
  moreTagsButton: {
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  moreTagsText: {
    color: '#666',
    fontSize: 13,
  },
  verificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
  },
  rating: {
    flexDirection: 'row',
  },
  clientInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  clientSpent: {
    fontSize: 13,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#666',
  },
  proposals: {
    fontSize: 13,
    color: '#666',
  },
});

