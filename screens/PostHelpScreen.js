import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

export default function PostHelpScreen() {
    const navigation = useNavigation();

    const handleGoHome = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Nav' }],
        });
      };
  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
    <View className="items-center h-full">
        <Image source={require('../assets//helpotw.gif')} className="w-11/12" />
        <Text className="items-center font-medium text-md p-2 leading-5 break-normal">Your request is sent to the relevant NGOs/Help Centers. They'll get back to you ASAP.</Text>
        <Text className="items-center font-medium text-md p-2 leading-5 break-normal">If it's an emergency press the 🚨 button on the top right of the home page or take the pet to the nearest hospital.</Text>
        <Text className="items-center font-medium text-lg p-2 pt-6 leading-5 break-normal">Thank you!</Text>
    <View>
        <TouchableOpacity className="h-14 w-10/12 mt-5 bg-text rounded-lg items-center justify-center"
        onPress={handleGoHome}
        >
        <Text className="text-white items-center justify-center font-semibold text-lg pl-5 pr-5">Go Home</Text>
        </TouchableOpacity>
        </View>
    </View>
  
    </SafeAreaView>
  )
}