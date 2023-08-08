import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-native-feather'
import * as Linking from 'expo-linking'
import { Divider } from "@react-native-material/core";
import { useDispatch,useSelector } from 'react-redux';
import { setDistance,setHelpData } from '../redux/slice/homeSlice';
import { getHelpData } from '../api';
import { urlFor } from '../sanity';



export default function NgoCard(props) {

  // useEffect(() => {
  //   getHelpData().then(data=>{
  //     setHelpData(data);
  //  })
  // }, [])

  // const dispatch = useDispatch()
  // const distance = useSelector((state) => state.home.distance);
    const { item, index, distance } = props;
   
  return (
    <View key={index}>
      <Divider style={{ marginBottom: 20, marginTop:0 }} />
    <View className="flex-row mb-5">
      
      <Image source={{uri: urlFor(item.image).url(),}} style={{width: 64, height: 63, borderRadius: 10}} />
        <View className="flex-col"  style={{width: '83%'}}>
            <Text className="text-black-600 font-semibold text-m ml-3">{item.name}</Text>
            <Text className="text-gray-600 font-medium text-xs mt-1 ml-3 w-2/3 ">{item.area}</Text>
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
            onPress={() => Linking.openURL(`${item.google_map}`)}
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
    
    </View>
  )
}