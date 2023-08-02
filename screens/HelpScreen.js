import { View, Text, TouchableOpacity  } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icon from 'react-native-feather'
import { useNavigation } from '@react-navigation/native';

export default function HelpScreen() {

    const navigation = useNavigation();

  return (
    <SafeAreaView>
    <View className="flex-row items-center mt-3">
        <TouchableOpacity className="pl-4"
        onPress={() => {navigation.goBack()}}
        >
            <Icon.ArrowLeft height= '25' width= '25' stroke= "black" />
        </TouchableOpacity>
        <View className="flex-grow items-center">
      <Text className="font-medium text-xl mr-10 ">Help</Text>
      </View>
      </View>

      <View className="flex-col justify-evenly pt-5">
    </View>
    </SafeAreaView>
  )
}