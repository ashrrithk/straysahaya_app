import { View, Text, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useDispatch,  useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { setLocation } from '../redux/slice/homeSlice';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

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
          
                const curLocation = await Location.getCurrentPositionAsync({});
                const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
                  longitude: curLocation.coords.longitude,
                  latitude: curLocation.coords.latitude,
                });
      if (reverseGeocodedAddress.length > 0) {
        const { name } = reverseGeocodedAddress[0];
        dispatch(setLocation(`${name}`));
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      setErrorMsg('Error obtaining current location');
    }
        };
  return (
    <View style={{flex: 1, maxHeight: 200}}>
      <View className="items-center mt-5">
    <Text className="text-black text-lg mb-5 font-medium">Set Your Location</Text>
  <TouchableOpacity className="h-14 w-10/12 bg-text rounded-lg flex-row items-center justify-center"
   onPress={fetchUserCurrentLocation}
  >
    <Ionicons name="locate-sharp" size={26} color="white" />
<Text className="text-white items-center justify-center font-semibold text-lg ml-3">Use Current Location</Text>
  </TouchableOpacity>
</View>
    </View>
  )
}