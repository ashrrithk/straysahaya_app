import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-native-feather'
import * as Linking from 'expo-linking'
import { Divider } from "@react-native-material/core";
import { useDispatch,useSelector } from 'react-redux';
import { setDistance,setHelpData, setGeoLoc } from '../redux/slice/homeSlice';
import { getHelpData } from '../api';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';



export default function HelpCard(props) {

  // useEffect(() => {
  //   getHelpData().then(data=>{
  //     setHelpData(data);
  //  })
  // }, [])

  // const dispatch = useDispatch()
  // const distance = useSelector((state) => state.home.distance);
    const { item, index } = props;
    const navigation = useNavigation();

    const geoLoc = useSelector((state) => state.home.geoLoc);
    const helpData= useSelector((state) => state.home.helpData);

    // console.log(item.latitude)
    // console.log(item.longitude)
    // console.log(geoLoc.coords.latitude)
    // console.log(geoLoc.coords.longitude)

   // Calculate distance from user's location for each NGO using Haversine formula
   const R = 6371; // Earth's radius in km
  const dLat = deg2rad(item.latitude - (geoLoc?.coords?.latitude || 0));
const dLon = deg2rad(item.longitude - (geoLoc?.coords?.longitude || 0));
   const a =
     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
     Math.cos(deg2rad(geoLoc.coords.latitude)) * Math.cos(deg2rad(item.latitude)) *
     Math.sin(dLon / 2) * Math.sin(dLon / 2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   const distanceInKms = (R * c).toFixed(1);
 
   function deg2rad(deg) {
     return deg * (Math.PI/180)
   }


   
  return (
    <View key={index}>
      <Divider style={{ marginBottom: 20, marginTop:0 }} />
      <TouchableWithoutFeedback
      onPress={() => navigation.navigate('HelpDetail', {...item})}
      >
    <View className="flex-row mb-5">
    
      <Image source={{uri: urlFor(item.image).url(),}} style={{width: 64, height: 63, borderRadius: 10}} />
        <View className="flex-col"  style={{width: '83%'}}>
            <Text className="text-black-600 font-semibold text-m ml-3">{item?.name}</Text>
            <Text className="text-gray-600 font-medium text-xs mt-1 ml-3 w-2/3 ">{item?.area} · {distanceInKms} kms</Text>
            <Text className="text-gray-600 font-medium text-xs mt-1 ml-3 w-2/3 ">{item?.category}</Text>
            {/* <View className={`flex-row rounded-md p-1 m-2 ${item.category === 'Rescue' ? 'bg-red-500' : item.category === 'Vet' ? 'bg-blue-500' : item.category === 'Animal Shelter' ? 'bg-orange-500' : item.category === 'Animal Birth Control' ? 'bg-green-500' : 'bg-black'}`} style={{ borderWidth:0.1, borderColor:'gray'}}>
              <Text className={`text-white font-semibold text-xs ml-2 ${item.category === 'Rescue' || item.category === 'Vet' || item.category === 'Animal Shelter' || item.category === 'Animal Birth Control' ? 'text-white' : 'text-black'}`}>{item?.category}</Text>
            </View> */}
    <View className="flex-row justify-end">
        <View className="mr-8 mt-0">
            <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${item.phone}`)}
            >
                <Icon.Phone height="20" width="20" stroke="black" />
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity
            onPress={() => Linking.openURL(`https://${item.google_map}`)}
            >
                <Icon.MapPin height="20" width="20" stroke="black" />
            </TouchableOpacity>
        </View>
        {/* <View>
            <TouchableOpacity>
                <Icon.Info height="20" width="20" stroke="black" />
            </TouchableOpacity>
        </View> */}

      </View>
      </View>
  
    </View>
    </TouchableWithoutFeedback>
    </View>
  )
}