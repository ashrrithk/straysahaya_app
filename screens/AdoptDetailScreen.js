import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAdoptData, setAdoption } from '../redux/slice/adoptSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icons from 'react-native-feather'
import {FlatListSlider} from 'react-native-flatlist-slider';
import { FontAwesome5, Ionicons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { urlFor } from '../sanity';
import {setDetailPageName} from '../redux/slice/adoptSlice';
import sanityClient from '../sanity';
import * as Linking from 'expo-linking';


export default function AdoptDetailScreen() {
  const {params} = useRoute();
  const navigation = useNavigation();
  let item = params;
  const dispatch = useDispatch();
  useEffect(() => {
    if(item && item.id){
      dispatch(setAdoptData({...item}))
    }
  },[])
  console.log('store: ' ,item)

  console.log(item?._id);

  const flastListSlider = () => {
  }
 
  const handleEnquiry = async () => {
    try{
        let query = `*[_type == "help" && name == "${item.help[0].name}"]{email}`;
        const result = await sanityClient.fetch(query);
        console.log("Result")
        console.log(result[0]);
        if (result[0]?.email?.length > 0 && result[0].email[0]) {
          // If email is available, navigate to the AdoptRequestForm screen with the name and helpCenter parameters
          navigation.navigate('AdoptRequestForm', { name: item?.name, helpCenter: item?.help[0]?.name });
        } else {
          // If email is not available, open the phone app with the help center's phone number
          Linking.openURL(`tel:${item?.help[0]?.phone}`);
        }
    } catch (error) {
    console.log(error);
  }
}
  return (
    <SafeAreaView style={{backgroundColor: 'white'}} className='h-full'>
         <View className="flex-row items-center mt-3">
      
      <TouchableOpacity className="pl-4"
      onPress={() => {navigation.goBack()}}
      >
          <Icons.ArrowLeft height= '28' width= '28' stroke= "black" />
      </TouchableOpacity>
      <View className="flex-grow items-center">
      <Text className="font-medium text-xl mr-10 mb-2 ">Details</Text>
      </View>
      </View>

      <ScrollView horizontal={false} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

      <View className="mt-3">
      <View>
      {/* <FlatListSlider 
    data={item.bannerImg} 
    imageKey={'banner'}
    local
    onPress={flastListSlider}
    height={300}
    loop={false}
  /> */}
  <Image source={{
                        uri: urlFor(item?.mainImage).url(),
                    }} className="w-full rounded-t-xl" style={{ height: 300 }} />
  </View>
  <View>
  <Text className="text-3xl font-semibold ml-5 mt-5">{item?.name}</Text>
  <View className="flex-row ml-5 mt-2 items-center">
  <Ionicons name="paw-outline" size={18} color="black"  />
  <Text className="text-md font-medium ml-2">{item?.animalType}</Text>
  </View>
  <View className="flex-row ml-5 mt-2 items-center">
  <Icons.MapPin className="mt-2" height="18" width="18" stroke="black" />
  <Text className="text-md font-medium ml-2 mt-2">{item?.help[0]?.name}</Text>
  </View>
  {item?.about?.description ? (
  <View className="flex-row items-center mt-5 ml-5">
    <Ionicons name="information-circle-outline" size={20} color="black" />
   <Text className="text-md font-medium leading-5 ml-2">{item?.about?.description}</Text>
   </View>) : null}
  </View>

  {/* About Section */}
  <View className="flex-col m-3 mt-5 " style={{backgroundColor:'#F5F9FA',borderRadius:20 }}>
    <Text className="m-3 text-black font-semibold text-lg">About</Text>
    <View className="flex-row flex-wrap"> 
    <View className="flex-row rounded-full px-4 py-2 m-2" style={{backgroundColor:'white', borderWidth:0.1, borderColor:'gray'}}>
    <MaterialCommunityIcons name="cake-variant-outline" size={20} color="red" />
        <Text className="text-black font-semibold text-sm ml-2">{item?.about?.age}</Text>
    </View>
    <View className="flex-row rounded-full px-4 py-2 m-2" style={{backgroundColor:'white', borderWidth:0.1, borderColor:'gray'}}>
        <FontAwesome5 name="certificate" size={20} color="orange"  />
        <Text className="text-black font-semibold text-sm ml-2">{item?.about?.breed}</Text>
    </View>
    <View className="flex-row rounded-full px-4 py-2 m-2" style={{backgroundColor:'white', borderWidth:0.1, borderColor:'gray'}}>
        
        {item?.about?.gender === 'Male' ? (
        <Ionicons name='male-outline' size={20} color="blue" />
      ) : (
        <Ionicons name='female-outline' size={20} color="pink" />
      )}
        <Text className="text-black font-semibold text-sm ml-2">{item?.about?.gender}</Text>
        </View>
    <View className="flex-row rounded-full px-4 py-2 m-2" style={{backgroundColor:'white', borderWidth:0.1, borderColor:'gray'}}>
        <Fontisto name="injection-syringe" size={20} color="purple" />
        <Text className="text-black font-semibold text-sm ml-2">{item?.about?.vaccination}</Text>
    </View>
    <View className="flex-row rounded-full px-4 py-2 m-2" style={{backgroundColor:'white', borderWidth:0.1, borderColor:'gray'}}>
        <FontAwesome5 name="cut" size={20} color="green" />
        <Text className="text-black font-semibold text-sm ml-2">{item?.about?.neutered}</Text>
    </View>
       
   </View>
   </View>
   <View className="items-center mb-5 mt-5">
  <TouchableOpacity className="h-14 w-11/12 bg-text rounded-lg items-center justify-center"
  onPress={handleEnquiry}
  >
<Text className="text-white items-center justify-center font-semibold text-lg">Enquire</Text>
  </TouchableOpacity>
</View>
  </View>
  </ScrollView>
    </SafeAreaView>
  )
}