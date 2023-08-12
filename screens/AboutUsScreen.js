import { View, Text, SafeAreaView, TouchableOpacity,TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import * as Icons from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'


export default function AboutUsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor:'white'}} className="h-full">
    <View className="flex-row items-center mt-3">

<TouchableOpacity className="pl-4"
onPress={() => {navigation.goBack()}}
>
  <Icons.X height= '28' width= '28' stroke= "black" />
</TouchableOpacity>
<View className="flex-grow items-center">
<Text className="font-medium text-xl mr-10 mb-2 ">About Us</Text>
</View>
</View>
<View className="flex-col justify-center w-6/6 h-12 rounded-xl m-5" style={{backgroundColor:'#F5F9FA'}}>
    <TouchableWithoutFeedback
    onPress={() => navigation.navigate('YourDetails')}
    >
  <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold ml-5 ">Terms & Conditions</Text>
        <Icons.ChevronRight height= '20' width= '20' stroke= "black" className="mr-3" />
  </View>
  </TouchableWithoutFeedback>
  </View>
  <View className="flex-col justify-center w-6/6 h-12 rounded-xl ml-5 mr-5 mt-2" style={{backgroundColor:'#F5F9FA'}}>
    <TouchableWithoutFeedback
    onPress={() => navigation.navigate('YourDetails')}
    >
  <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold ml-5 ">Privacy Policy</Text>
        <Icons.ChevronRight height= '20' width= '20' stroke= "black" className="mr-3" />
  </View>
  </TouchableWithoutFeedback>
  </View>
</SafeAreaView>
  )
}