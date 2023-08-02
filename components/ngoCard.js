import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from 'react-native-feather'
import * as Linking from 'expo-linking'

export default function NgoCard(props) {
    const { item, index } = props;
  return (
    <View key={index}>
    <View className="flex-row mb-10">
      <Image source={item.image} style={{width: 64, height: 63, borderRadius: 10}} />
        <View className="flex-col"  style={{width: '83%'}}>
            <Text className="text-black-600 font-semibold text-m ml-3">{item.name}</Text>
            <Text className="text-gray-600 font-medium text-xs mt-1 ml-3">{item.area}</Text>
    <View className="flex-row justify-end">
        <View className="mr-8">
            <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${item.phone1}`)}
            >
                <Icon.Phone height="20" width="20" stroke="black" />
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity
            onPress={() => Linking.openURL(`https://${item.google_maps}`)}
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