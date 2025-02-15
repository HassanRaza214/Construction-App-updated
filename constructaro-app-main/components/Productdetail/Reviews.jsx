import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Rating } from 'react-native-ratings';
import { Colors } from '../../constants/Colors';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';

const Reviews = ({ product }) => {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState('');

  const onSubmit = async () => {
    const docRef = doc(db, "ItemsList", product?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating,
        comment: userInput,
      }),
    });

    ToastAndroid.show('Comment Added Successfully!', ToastAndroid.BOTTOM);
  };

  return (
    <View style={{ paddingHorizontal: 15,marginTop:20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reviews</Text>
      <View>
        <Rating
          showRating={false}
          imageSize={25}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Write Your Comment"
          multiline
          numberOfLines={4}
          onChangeText={(value) => setUserInput(value)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: '#666',
            textAlignVertical: 'top',
          }}
        />
        <TouchableOpacity
          disabled={!userInput}
          onPress={onSubmit}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 8,
            marginTop: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '500',
              color:'#fff',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      {product?.reviews?.map((item, index) => (
        <View
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderColor: '#666',
            borderRadius: 15,
            marginTop: 10,
            flexWrap:'wrap'
          }}>
          <Rating
            imageSize={15}
            startingValue={item.rating}
            readonly
            style={{ alignItems: 'flex-start' }}
          />
          <Text>{item.comment}</Text>
        </View>
      ))}
    </View>
  );
};

export default Reviews;