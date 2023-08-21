import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icons from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "white" }} className="h-full">
      {/* 
<TouchableOpacity className="pl-4"
onPress={() => {navigation.goBack()}}
>
  <Icons.ArrowLeft height= '28' width= '28' stroke= "black" />
</TouchableOpacity> */}
      <View className="flex-col mt-3 items-center">
        <Text className="font-medium text-xl mb-2 ">Settings</Text>
      </View>

      <View className="flex-col mt-3">
        {/* <View className=" ml-5 mt-5">
  <Text className="text-2xl font-semibold">Ashrrith Karunaakar</Text>
</View> */}
        {/* <View className="flex-col items-center mt-8">
<TouchableWithoutFeedback
    onPress={() => navigation.navigate('AnimalsHelped')}
    >
  <View className="flex-col justify-center items-center w-5/6 h-16 rounded-xl m-5" style={{backgroundColor:'#F5F9FA'}}>
  <Text className="text-xl font-semibold">Help Requests</Text>
  </View>
  </TouchableWithoutFeedback>
  <View className="flex-col justify-center items-center w-5/6 h-16 rounded-xl" style={{backgroundColor:'#F5F9FA'}}>
  <Text className="text-xl font-semibold text-gray-500">Donations</Text>
  </View>
</View> */}
        <View className="flex-col mt-3">
          {/* <View className=" ml-5 mt-5">
  <Text className="text-lg font-semibold">Settings</Text>
</View> */}

          {/* Your Details */}
          {/* <View className="flex-col justify-center w-6/6 h-12 rounded-xl m-5" style={{backgroundColor:'#F5F9FA'}}>
    <TouchableWithoutFeedback
    onPress={() => navigation.navigate('YourDetails')}
    >
  <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold ml-5 ">Your Details</Text>
        <Icons.ChevronRight height= '20' width= '20' stroke= "black" className="mr-3" />
  </View>
  </TouchableWithoutFeedback>
  </View> */}

          {/* About Us */}
          <View
            className="flex-col justify-center w-6/6 h-12 rounded-xl ml-5 mr-5"
            style={{ backgroundColor: "#F5F9FA" }}
          >
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("AboutUs")}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-medium ml-5 ">About Us</Text>
                <Icons.ChevronRight
                  height="20"
                  width="20"
                  stroke="black"
                  className="mr-3"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Contact */}
          <View
            className="flex-col justify-center w-6/6 h-12 rounded-xl m-5"
            style={{ backgroundColor: "#F5F9FA" }}
          >
            <TouchableWithoutFeedback
              onPress={() =>
                Linking.openURL(`mailto:ashrrithk+straysahaya@gmail.com`)
              }
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-medium ml-5 ">Feedback</Text>
                <Icons.Mail
                  height="20"
                  width="20"
                  stroke="black"
                  className="mr-3"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Add HelpCenter */}
          <View
            className="flex-col justify-center w-6/6 h-12 rounded-xl ml-5 mr-5"
            style={{ backgroundColor: "#F5F9FA" }}
          >
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("AddHelpScreen")}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-medium ml-5 ">
                  Add Help Center
                </Text>
                <Icons.Plus
                  height="20"
                  width="20"
                  stroke="black"
                  className="mr-3"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Logout */}
          {/* <View className="flex-col justify-center w-6/6 h-12 rounded-xl m-5" style={{backgroundColor:'#F5F9FA'}}>
    <TouchableWithoutFeedback
    onPress={() => navigation.navigate('YourDetails')}
    >
  <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold ml-5 ">Log out</Text>
        <Icons.LogOut height= '20' width= '20' stroke= "black" className="mr-3" />
  </View>
  </TouchableWithoutFeedback>
  </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
