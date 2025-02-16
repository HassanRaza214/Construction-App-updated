import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ToastAndroid, 
  StyleSheet,
  Keyboard
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { Colors } from '../../constants/Colors';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { AntDesign } from '@expo/vector-icons';

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <View style={styles.reviewHeaderText}>
          <Text style={styles.reviewerName}>User</Text>
          <Rating
            imageSize={14}
            startingValue={review.rating}
            readonly
            style={styles.ratingStars}
          />
        </View>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );
};

const Reviews = ({ product }) => {
  const [rating, setRating] = useState(5);
  const [userInput, setUserInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!userInput.trim()) return;
    
    setIsSubmitting(true);
    Keyboard.dismiss();
    
    try {
      const docRef = doc(db, "ItemsList", product?.id);
      await updateDoc(docRef, {
        reviews: arrayUnion({
          rating,
          comment: userInput,
          createdAt: new Date().toISOString(),
        }),
      });

      ToastAndroid.show('Review added successfully!', ToastAndroid.SHORT);
      setUserInput('');
      setRating(5);
    } catch (error) {
      console.error("Error adding review:", error);
      ToastAndroid.show('Failed to add review', ToastAndroid.SHORT);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviews = product?.reviews || [];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Customer Reviews</Text>
      
      {reviews.length > 0 ? (
        <View style={styles.reviewsList}>
          {reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </View>
      ) : (
        <View style={styles.noReviews}>
          <AntDesign name="message1" size={32} color="#ccc" />
          <Text style={styles.noReviewsText}>No reviews yet</Text>
        </View>
      )}
      
      <View style={styles.addReviewSection}>
        <Text style={styles.addReviewTitle}>Add Your Review</Text>
        
        <Rating
          showRating={false}
          imageSize={30}
          startingValue={rating}
          onFinishRating={(value) => setRating(value)}
          style={styles.userRating}
        />
        
        <TextInput
          placeholder="Write your review here..."
          multiline
          numberOfLines={4}
          value={userInput}
          onChangeText={(value) => setUserInput(value)}
          style={styles.reviewInput}
        />
        
        <TouchableOpacity
          disabled={!userInput.trim() || isSubmitting}
          onPress={onSubmit}
          style={[
            styles.submitButton,
            (!userInput.trim() || isSubmitting) && styles.disabledButton
          ]}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  reviewsList: {
    marginBottom: 24,
  },
  reviewItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reviewHeaderText: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  ratingStars: {
    alignItems: 'flex-start',
  },
  reviewComment: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  noReviews: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 24,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
  },
  addReviewSection: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
  },
  addReviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  userRating: {
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  reviewInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Reviews;