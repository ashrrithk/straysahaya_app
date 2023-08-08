import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import * as Icon from 'react-native-feather'
import * as Linking from 'expo-linking'
import { Divider } from "@react-native-material/core";
import { Ionicons } from '@expo/vector-icons';
import { getHelpData } from '../api';
import { urlFor } from '../sanity';




export default function DonateCard(props) {
    const { item, index } = props;
    const handleDonatePress = () => {
        if (item.donate != '') { // Add an if statement to check if item.donate is defined
          Linking.openURL(`${item.donate}`);
        }
      };
  return (
    <View key={index}>
      <Divider style={{ marginBottom: 10, marginTop:10 }} />
      <TouchableOpacity
     onPress={handleDonatePress}
     >
    <View className="flex-row items-center">
    
      <Image source={{uri: urlFor(item.image).url(),}} style={{width: 64, height: 63, borderRadius: 10}} />
      <Text className="text-black-600 font-semibold text-m ml-3">{item.name}</Text>
      </View>
    </TouchableOpacity>
        

    
    </View>
  )
}