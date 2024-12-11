import { View, Text, Image } from 'react-native'
import React from 'react'

export default function WorkersListCard(worker) {
  return (
    <View>
        <Image
        source={{ uri: worker?.imageUrl }}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15,
        }}
      />
        <Text>Worker</Text>
    </View>
  )
}