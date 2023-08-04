import { View, Text,TouchableWithoutFeedback, TextInput, ScrollView,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from 'react-native-feather'
import * as Linking from 'expo-linking'
import { useNavigation } from '@react-navigation/native';
import { ngos } from '../constants'
import HelpNearBy from '../components/helpNearBy'


export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
    <StatusBar barStyle="dark-content" />
    <View className = "flex-row items-center space-x-2 px-4 pb-2">
    <View className = "flex-row items-center space-x-1 border-0 border-l-1 pl-2 pb-3 pt-3 border-gray-300">
             <Text className = "text-black-600 pt-3 font-semibold text-2xl"><Text className="text-gray-600 font-medium">Hi,</Text> Ashrrith</Text>
    </View>
    <TouchableOpacity
    className = "justify-end items-end flex-1 pr-2"
    //TODO: Replace my number with PETA emergency call
     onPress={() => Linking.openURL('tel:+919731417095')} >
    <Image source={require('../assets/freepik/siren.png')} style={{width: 26, height: 26}} 
   />
    </TouchableOpacity>
    </View>
   <ScrollView 
    horizontal={false}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom: 100}}>
    {/* <View className = "flex-row items-center space-x-2 px-4 pb-2">
     <TouchableWithoutFeedback
     onPress={() => navigation.navigate('Search')}
     >
         <View className = " flex-row flex-1 items-center p-3 rounded-2xl border border-gray-300">
             <Icon.Search height="20" width="20" stroke="gray" />
             <TextInput editable={false} placeholder="Search" className = "flex-1 ml-2" />
         </View>
     </TouchableWithoutFeedback>
     <View className = "p-3 rounded-full">
         <Icon.Sliders height="20" width="20" stroke="black" />
     </View>
     </View> */}


     <View className="flex-row justify-evenly pt-5">
      <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Help')}
      >
        <Image source={require('../assets/freepik/help.png')} style={{width: 97, height: 118, borderRadius: 10}} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Adopt')}
      >
        <Image source={require('../assets/freepik/adopt.png')} style={{width: 97, height: 118, borderRadius:10}} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Donate')}
      >
        <Image source={require('../assets/freepik/donate.png')} style={{width: 97, height: 118,borderRadius:10}} />
      </TouchableWithoutFeedback>
     </View>
     <View className="pt-7 pl-5">
      <Text className="font-medium text-lg text-gray-500">Help near you</Text>
     </View>
    {/*main*/}
  
    <HelpNearBy />
 
    </ScrollView>
 </SafeAreaView>
  )
}