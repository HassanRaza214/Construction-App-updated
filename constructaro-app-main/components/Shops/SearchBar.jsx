import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { Colors } from './../../constants/Colors';

export default function Searchbar({ productsList = [], onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);

        // Remove the redundant (productsList || []) check
        const filteredProducts = productsList.filter(product =>
            product.name?.toLowerCase()?.includes(query.toLowerCase())
        );

        onSearch(filteredProducts);
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
