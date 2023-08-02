import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { ngos } from '../constants';
import NgoCard from './ngoCard';

export default function HelpNearBy() {
  return (
    <View className="mt-7">
    <ScrollView
    horizontal={false}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
   contentContainerStyle={{
       paddingHorizontal: 15
       }}>
       {
           ngos.map((ngo, index) => {
               return (
                    <NgoCard
                      item={ngo}
                      key={index}
                      />
                //    <View key={index} className="flex justify-center items-center mr-6">
                      
                //       {/* <Image source={ngo.image} style={{width: 64, height: 63, borderRadius: 10}} /> */}
                //    </View>
               )
           })
       }
   </ScrollView>
   </View>
  )
}