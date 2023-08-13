import { View, Text, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useDispatch,  useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { setLocation } from '../redux/slice/homeSlice';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { I } from '@expo/html-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LocationModal() {
const dispatch = useDispatch()
const location = useSelector((state) => state.home.location);
const error = useSelector((state) => state.home.error);
const navigator = useNavigation();
const [errorMsg, setErrorMsg] = useState(null);

  
  //Fetch user's location
        const fetchUserCurrentLocation = async () => {
          
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                  setErrorMsg('Permission to access location was denied');
                  return;
                }
                const isAndroid = Platform.OS == 'android';
                const curLocation = await Location.getCurrentPositionAsync({ accuracy: isAndroid ? Location.Accuracy.Low : Location.Accuracy.Lowest, })
                // const curLocation = await Location.getCurrentPositionAsync({});
                const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
                  longitude: curLocation.coords.longitude,
                  latitude: curLocation.coords.latitude,
                });
      if (reverseGeocodedAddress.length > 0) {
        const { name, city } = reverseGeocodedAddress[0];
        dispatch(setLocation(`${name}, ${city}`));
        navigator.goBack();
      }
    } catch (error) {
      console.log(error);
      setErrorMsg('Error obtaining current location');
    }
        };
  return (
    <SafeAreaView style={{backgroundColor:'white'}} className="h-full">
    <View className="h-1/2" style={{flex: 1, maxHeight: 200}}>
      <View className="items-center mt-3 h-1/2">
      <View className="flex-row items-center mt-2">
        <TouchableOpacity className="pl-4"
        onPress={() => {navigator.goBack()}}
        >
            <Ionicons name="close" size={24} color="black" />

        </TouchableOpacity>
        <View className="flex-grow items-center">
      <Text className="font-medium text-xl mr-10">Set Your Location</Text>
      </View>
      </View>
  <TouchableOpacity className="h-14 w-10/12 mt-10 bg-text rounded-lg flex-row items-center justify-center"
   onPress={fetchUserCurrentLocation}
  >
    <Ionicons name="locate-sharp" size={26} color="white" />
<Text className="text-white items-center justify-center font-semibold text-lg ml-3">Use Current Location</Text>
  </TouchableOpacity>
</View>
    </View>
    </SafeAreaView>
  )
}