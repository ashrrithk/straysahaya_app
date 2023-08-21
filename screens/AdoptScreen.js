import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { adoption } from "../constants";
import AdoptionCard from "../components/adoptionCard";
import * as Icons from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { getAdoptionsData } from "../api";
import { setAdoptData } from "../redux/slice/adoptSlice";
import { useSelector, useDispatch } from "react-redux";

export default function AdoptScreen() {
  const dispatch = useDispatch();
  const adoptData = useSelector((state) => state.adopt.adoptData);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAdoptionsData().then((data) => {
      dispatch(setAdoptData(data));
      console.log(data);
    });
  }, []);

  const navigation = useNavigation();

  const pullMe = async () => {
    setRefresh(true);
    try {
      await getAdoptionsData().then((data) => {
        dispatch(setAdoptData(data));
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
    setRefresh(false);
  };
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
          <Text className="font-medium text-xl mr-10 mb-2 ">Adopt</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }
      >
        <View className="flex-row flex-wrap ">
          {adoptData.map((adoption, index) => {
            return (
              <View
                className="w-1/2 items-center"
                style={{ paddingHorizontal: 5 }}
              >
                <AdoptionCard item={adoption} key={index} />
              </View>
              //    <View key={index} className="flex justify-center items-center mr-6">

              //       {/* <Image source={ngo.image} style={{width: 64, height: 63, borderRadius: 10}} /> */}
              //    </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
