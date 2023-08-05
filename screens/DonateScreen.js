import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DonateCard from '../components/donateCard'
import { ngos } from '../constants'
import * as Icons from 'react-native-feather'

export default function DonateScreen() {
  return (
    <SafeAreaView style={{backgroundColor:'white'}} className="h-full">
            <View className="flex-row items-center mt-3">
      
      <TouchableOpacity className="pl-4"
      onPress={() => {navigation.goBack()}}
      >
          <Icons.ArrowLeft height= '28' width= '28' stroke= "black" />
      </TouchableOpacity>
      <View className="flex-grow items-center">
      <Text className="font-medium text-xl mr-10 mb-2 ">Donate</Text>
      </View>
      </View>
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
                    <DonateCard
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
    </SafeAreaView>
  )
}