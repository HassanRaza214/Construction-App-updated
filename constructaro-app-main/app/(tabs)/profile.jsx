import { ScrollView, View } from 'react-native';
import React from 'react';
import ProfileHeader from './../../components/Profile/ProfileHeader';
import ProfileDetail from '../../components/Profile/ProfileDetail';
import General from '../../components/Profile/General';

export default function Profile() {
  return (
    <ScrollView>
      <View>
        <ProfileHeader />
        <ProfileDetail />
        <General />
      </View>
    </ScrollView>
  );
}
