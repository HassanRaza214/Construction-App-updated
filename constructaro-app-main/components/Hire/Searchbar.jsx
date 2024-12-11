import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { Colors } from './../../constants/Colors';

export default function Searchbar({ workersList, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter workers list based on query
    const filteredWorkers = workersList.filter(worker =>
      worker.name.toLowerCase().includes(query.toLowerCase())
    );

    // Pass the filtered list to the parent component
    onSearch(filteredWorkers);
  };

  return (
    <View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 50,
        height: 45,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
      }}>
        {/* Search icon */}
        <Ionicons 
          name="search"
          size={24}
          color={Colors.PRIMARY}
        />

        {/* Text input for search bar */}
        <TextInput 
          placeholder='Search...'
          value={searchQuery}
          onChangeText={handleSearch}
          style={{
            fontSize: 16,
            flex: 1, // Ensures the input expands to fill available space
          }}
        />
      </View>
    </View>
  );
}
