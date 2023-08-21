import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import * as Icons from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function YourDetailsScreen() {
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
          <Text className="font-medium text-xl mr-10 mb-2 ">Your Details</Text>
        </View>
      </View>
      <View
        className="flex-col mt-5 ml-5 mr-5 rounded-xl"
        style={{ backgroundColor: "#F5F9FA" }}
      >
        <Text className="text-md text-gray-500 ml-3 mt-3 mb-2">Full Name</Text>
        <Text className="text-lg font-semibold ml-3 mb-3">
          Ashrrith Karunaakar
        </Text>
      </View>
      <View
        className="flex-col mt-5 ml-5 mr-5 rounded-xl"
        style={{ backgroundColor: "#F5F9FA" }}
      >
        <Text className="text-md text-gray-500 ml-3 mt-3 mb-2">Email</Text>
        <Text className="text-lg font-semibold ml-3 mb-3">
          ashrrithk@gmail.com
        </Text>
      </View>
    </SafeAreaView>
  );
}
