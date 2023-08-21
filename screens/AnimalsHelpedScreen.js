import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import * as Icons from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function AnimalsHelpedScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "white" }} className="h-full">
      <View className="flex-row items-center mt-3">
        <TouchableOpacity
          className="pl-4"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icons.ArrowLeft height="28" width="28" stroke="black" />
        </TouchableOpacity>
        <View className="flex-grow items-center">
          <Text className="font-medium text-xl mr-10 mb-2 ">Help Requests</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
