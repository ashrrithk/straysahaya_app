import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import { Ionicons } from '@expo/vector-icons';

export default function AdoptionCard(props) {
  const { item, index } = props;
  const navigation = useNavigation();

  return (
      <View className="flex-row rounded-xl m-2">
        <TouchableOpacity
          className= "rounded-xl mb-3 mt-3"
          style={{backgroundColor: '#F5F9FA'}}
          onPress={() => {
            navigation.navigate('AdoptDetail', {...item});
          }}
        >
          
            <View className="bg-gray-200 rounded-xl ">
              <Image source={item.image} className="w-full rounded-xl" style={{ height: 122 }} />
              <View className="p-3">
                <Text className="font-bold text-lg">{item.name}</Text>
                <View className="flex-row items-center mt-2">
                <Ionicons name="paw-outline" size={15} color="black"  />
                <Text className="font-medium text-md ml-2">{item.animalType}</Text>
                </View>
                <View className="flex-row items-center mt-3">
                <Icon.MapPin  height="12" width="12" stroke="black" />
                <Text className="font-regular text-xs ml-2 break-all">{item.center}</Text>
                </View>
              </View>
          </View>
        </TouchableOpacity>

        {/* Second card */}
        {/* Add another TouchableOpacity with the same structure as above */}
      </View>
  );
}