import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView, Modal, ToastAndroid } from 'react-native';
import { Colors } from "../../constants/Colors";
import { setDoc, getDocs, query, doc } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { auth } from '../../configs/FireBaseConfig'; // Import Firebase auth

export default function postAJob() {
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [experienceLevel, setExperienceLevel] = useState('intermediate');
  const [budgetType, setBudgetType] = useState('hourly');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const difficultyOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' }
  ];

  const experienceLevelOptions = [
    { label: 'Entry Level', value: 'entry' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Expert', value: 'expert' }
  ];

  const budgetTypeOptions = [
    { label: 'Hourly Rate', value: 'hourly' },
    { label: 'Daily Rate', value: 'daily' },
    { label: 'Fixed Price', value: 'fixed' }
  ];

  const handleSubmit = () => {
    const formData = {
      jobTitle,
      skills: skills.split(',').map(skill => skill.trim()),
      difficulty,
      experienceLevel,
      budget: {
        type: budgetType,
        amount: budgetAmount
      },
      description
    };

    console.log('Form submitted:', formData);
    // Here you would typically send this data to your API
    alert('Job Posted Successfully!');
  };

  const openPickerModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const getOptionsForModalType = () => {
    switch (modalType) {
      case 'difficulty':
        return difficultyOptions;
      case 'experienceLevel':
        return experienceLevelOptions;
      case 'budgetType':
        return budgetTypeOptions;
      default:
        return [];
    }
  };

  const handleOptionSelect = (value) => {
    switch (modalType) {
      case 'difficulty':
        setDifficulty(value);
        break;
      case 'experienceLevel':
        setExperienceLevel(value);
        break;
      case 'budgetType':
        setBudgetType(value);
        break;
    }
    setModalVisible(false);
  };

  const getSelectedLabel = (type) => {
    switch (type) {
      case 'difficulty':
        return difficultyOptions.find(option => option.value === difficulty)?.label;
      case 'experienceLevel':
        return experienceLevelOptions.find(option => option.value === experienceLevel)?.label;
      case 'budgetType':
        return budgetTypeOptions.find(option => option.value === budgetType)?.label;
      default:
        return '';
    }
  };



  const postAJob = async () => {
    try {
      const user = auth.currentUser; // Get the logged-in user

      if (!user) {
        ToastAndroid.show('User not authenticated', ToastAndroid.BOTTOM);
        return;
      }

      await setDoc(doc(db, 'Proposals', Date.now().toString()), {
        UserId: user.uid, 
        JobTitle: jobTitle,
        Skills: skills.split(',').map(skill => skill.trim()), 
        JobLevel: experienceLevel, 
        JobDifficulty: difficulty, 
        PriceBase: budgetType, 
        BudgetAmount: budgetAmount, 
        JobDescription: description,
        CreatedAt: new Date().toISOString(),
        Area: area
      });

      ToastAndroid.show('Job Added...', ToastAndroid.BOTTOM);
    } catch (error) {
      console.error('Error posting job:', error);
      ToastAndroid.show('Failed to post job', ToastAndroid.BOTTOM);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.header}>Create Job Posting</Text>

          {/* Job Title */}
          <Text style={styles.label}>Job Title</Text>
          <TextInput
            style={styles.input}
            value={jobTitle}
            onChangeText={setJobTitle}
            placeholder="Enter job title"
          />

          {/* Skills */}
          <Text style={styles.label}>Skills Required (comma separated)</Text>
          <TextInput
            style={styles.input}
            value={skills}
            onChangeText={setSkills}
            placeholder="e.g. Electrician, Plumber, Carpenter"
          />

          {/* Difficulty */}
          <Text style={styles.label}>Project Difficulty</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => openPickerModal('difficulty')}
          >
            <Text style={styles.pickerButtonText}>
              {getSelectedLabel('difficulty')}
            </Text>
          </TouchableOpacity>

          {/* Experience Level */}
          <Text style={styles.label}>Experience Level</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => openPickerModal('experienceLevel')}
          >
            <Text style={styles.pickerButtonText}>
              {getSelectedLabel('experienceLevel')}
            </Text>
          </TouchableOpacity>

          {/* Budget Type */}
          <Text style={styles.label}>Budget Type</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => openPickerModal('budgetType')}
          >
            <Text style={styles.pickerButtonText}>
              {getSelectedLabel('budgetType')}
            </Text>
          </TouchableOpacity>

          {/* Budget Amount */}
          <Text style={styles.label}>Budget Amount</Text>
          <TextInput
            style={styles.input}
            value={budgetAmount}
            onChangeText={setBudgetAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Area</Text>
          <TextInput
            style={styles.input}
            value={area}
            onChangeText={setArea}
            placeholder="e.g. Dhoraji, Bahadurabad, Defence"
          />

          {/* Description */}
          <Text style={styles.label}>Project Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Provide details about the project..."
            multiline
            numberOfLines={6}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => postAJob()}
          >
            <Text style={styles.buttonText}>Post Job</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Custom Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select an option</Text>

            {getOptionsForModalType().map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => handleOptionSelect(option.value)}
              >
                <Text style={styles.modalOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    marginTop: 10,
    backgroundColor: "#fff"
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#34495e',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  pickerButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 15,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#e74c3c',
  }
});