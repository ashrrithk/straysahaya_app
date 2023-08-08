import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import { Ionicons } from '@expo/vector-icons';
import { urlFor } from '../sanity'

export default function AdoptionCard(props) {
  const { item, index } = props;
  const navigation = useNavigation();

  return (
      <View key={index} className="flex-row  rounded-xl m-2">
        <TouchableOpacity
          className= "rounded-xl mb-3 mt-3 min-w-full"
          style={{backgroundColor: '#F5F9FA'}}
          onPress={() => {
            navigation.navigate('AdoptDetail', {...item});
          }}
        >
          
            <View className="bg-gray-200 rounded-xl ">
              <Image source={{
                        uri: urlFor(item.mainImage).url(),
                    }} className="w-full rounded-t-xl" style={{ height: 125 }} />
              <View className="p-3">
                <Text className="font-bold text-lg" numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                <View className="flex-row items-center mt-2">
                <Ionicons name="paw-outline" size={15} color="black"  />
                <Text className="font-medium text-md ml-2">{item.animalType}</Text>
                </View>
                <View className="flex-row items-center mt-3">
                <Icon.MapPin  height="12" width="12" stroke="black" />
                <Text className="font-regular text-xs ml-2 break-all">{item.help[0].name}</Text>
                </View>
              </View>
          </View>
        </TouchableOpacity>

        {/* Second card */}
        {/* Add another TouchableOpacity with the same structure as above */}
      </View>
  );
}