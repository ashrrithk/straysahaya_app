import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdoptData, setAdoption } from "../redux/slice/adoptSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icons from "react-native-feather";
import {
  FontAwesome5,
  Ionicons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { urlFor } from "../sanity";
import { setDetailPageName } from "../redux/slice/adoptSlice";
import sanityClient from "../sanity";
import * as Linking from "expo-linking";
import { getAdoptionsData } from "../api";

export default function HelpDetailScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  let item = params;
  const dispatch = useDispatch();

  const adoptData = useSelector((state) => state.adopt.adoptData);

  useEffect(() => {
    getAdoptionsData().then((data) => {
      dispatch(setAdoptData(data));
      console.log(data);
    });
  }, []);

  console.log(item);

  //   const handleEnquiry = async () => {
  //     try{
  //         let query = `*[_type == "help" && name == "${item.help[0].name}"]{email}`;
  //         const result = await sanityClient.fetch(query);
  //         console.log("Result")
  //         console.log(result[0]);
  //         if (result[0]?.email?.length > 0 && result[0].email[0]) {
  //           // If email is available, navigate to the AdoptRequestForm screen with the name and helpCenter parameters
  //           navigation.navigate('AdoptRequestForm', { name: item?.name, helpCenter: item?.help[0]?.name });
  //         } else {
  //           // If email is not available, open the phone app with the help center's phone number
  //           Linking.openURL(`tel:${item?.help[0]?.phone}`);
  //         }
  //     } catch (error) {
  //     console.log(error);
  //   }
  // }

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
          <Text className="font-medium text-xl mr-10 mb-2 ">Details</Text>
        </View>
      </View>

      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex-col">
          <View className="items-center ml-2 mr-2 mt-5">
            {item.category === "Rescue" ? (
              <Image
                className="rounded-lg"
                source={require("../assets/freepik/rescueBanner.jpg")}
                style={{ width: "100%", height: 200 }}
              />
            ) : item.category === "Vet" ? (
              <Image
                className="rounded-lg"
                source={require("../assets/freepik/vetBanner.jpg")}
                style={{ width: "100%", height: 200 }}
              />
            ) : item.category === "Animal Shelter" ? (
              <Image
                className="rounded-lg"
                source={require("../assets/freepik/shelterBanner.jpg")}
                style={{ width: "100%", height: 200 }}
              />
            ) : item.category === "Animal Birth Control" ? (
              <Image
                className="rounded-lg"
                source={require("../assets/freepik/abcBanner.jpg")}
                style={{ width: "100%", height: 200 }}
              />
            ) : null}
          </View>
          <View className=" mt-5 items-center" style={{ position: "relative" }}>
            <View
              className="border-white border-1 p-2 rounded-lg mb-3"
              style={{
                backgroundColor: "white",
                position: "absolute",
                bottom: 73,
              }}
            >
              <Image
                source={{ uri: urlFor(item?.image).url() }}
                style={{ width: 64, height: 63, borderRadius: 10 }}
              />
            </View>
            <Text className="font-medium text-xl mt-5">{item?.name}</Text>
            <Text className="text-gray-500 mt-1">{item?.area}</Text>
            <Text className="text-gray-500 mt-1">{item?.timing}</Text>
          </View>
          <View className="flex-row items-center mt-10 justify-evenly">
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${item?.phone}`);
              }}
            >
              <View
                className="w-24 h-12  items-center justify-center rounded-md"
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <Ionicons
                  name="call-outline"
                  size={24}
                  color="black"
                  className="ml-5 mt-5"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`https://${item?.google_map}`);
              }}
            >
              <View
                className="w-24 h-12 items-center justify-center rounded-md"
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <Ionicons
                  name="map-outline"
                  size={24}
                  color="black"
                  className="ml-5 mt-5"
                />
              </View>
            </TouchableOpacity>

            {item?.email ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`mailto:${item?.email}`);
                }}
              >
                <View
                  className="w-24 h-12 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <Ionicons
                    name="mail-outline"
                    size={24}
                    color="black"
                    className="ml-5 mt-5"
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity disabled={true}>
                <View
                  className="w-24 h-12 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <Ionicons
                    name="mail-outline"
                    size={24}
                    color="black"
                    className="ml-5 mt-5"
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
