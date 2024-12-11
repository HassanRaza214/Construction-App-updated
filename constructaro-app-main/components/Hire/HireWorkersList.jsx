import { View, Text, FlatList } from 'react-native'
import React from 'react'
import WorkersListCard from './WorkersListCard'

export default function HireWorkersList({workersList}) {
  return (
    <View>
        <FlatList
        data={workersList}
        renderItem={({item,index})=>(
            <WorkersListCard
            key={index}
            worker={item}
            />
        )}
        
        />
    </View>
  )
}