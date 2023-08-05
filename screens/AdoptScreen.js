import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { adoption } from '../constants'
import AdoptionCard from '../components/adoptionCard'
import * as Icons from 'react-native-feather'
import { useNavigation } from '@react-navigation/native';


export default function AdoptScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor:'white'}} className="h-full">
      <View className="flex-row items-center mt-3">
      
<TouchableOpacity className="pl-4"
onPress={() => {navigation.goBack()}}
>
    <Icons.ArrowLeft height= '28' width= '28' stroke= "black" />
</TouchableOpacity>
<View className="flex-grow items-center">
<Text className="font-medium text-xl mr-10 mb-2 ">Adopt</Text>
</View>
</View>
<ScrollView showsVerticalScrollIndicator={false} horizontal={false} showsHorizontalScrollIndicator={false}>
  <View className="flex-row flex-wrap ">
      {
           adoption.map((adoption, index) => {
               return (
                <View className="w-1/2 items-center">
                    <AdoptionCard
                      item={adoption}
                      key={index}
                      />
                      </View>
                //    <View key={index} className="flex justify-center items-center mr-6">
                      
                //       {/* <Image source={ngo.image} style={{width: 64, height: 63, borderRadius: 10}} /> */}
                //    </View>
               )
           })
       }
       </View>
        </ScrollView>
        </SafeAreaView>
  )
}