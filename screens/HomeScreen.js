import { View, Text,TouchableWithoutFeedback, TextInput, ScrollView,Image, TouchableOpacity } from 'react-native'
import React, {useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from 'react-native-feather'
import * as Linking from 'expo-linking'
import { useNavigation } from '@react-navigation/native';
import { ngos } from '../constants'
import HelpNearBy from '../components/helpNearBy'
import { useDispatch, useSelector } from 'react-redux';
import { setDistance, setLocation, setError } from '../redux/slice/homeSlice';
import * as Location from 'expo-location';




export default function HomeScreen() {
  const navigation = useNavigation();
  const location = useSelector((state) => state.home.location);
  const error = useSelector((state) => state.home.error);
  const dispatch = useDispatch()

  useEffect(() => {
    fetchUserCurrentLocation()
  }, [])
    const fetchUserCurrentLocation = async () => {
        try{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }
    // Get user's current location
    let curLocation = await Location.getCurrentPositionAsync({});
    console.log(curLocation)
  
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: curLocation.coords.longitude,
      latitude: curLocation.coords.latitude,
      
    });
    console.log(reverseGeocodedAddress)
    if (reverseGeocodedAddress.length > 0) {
      const {name, district, city, region, postalCode } = reverseGeocodedAddress[0];
      dispatch(setLocation(`${name}, ${city}`));
    }
  } catch (error) {
    console.log(error);
    setError('Error obtaining current location');
  }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
    <StatusBar barStyle="dark-content" />
    <View className = "flex-row items-center space-x-2 px-4 pb-2">
    <View  className = "flex-row items-center space-x-1 border-0 border-l-1 pl-2 pb-3 pt-3 border-gray-300">
        <Text className="text-black text-lg font-medium " onPress={() => navigation.navigate('LocationModal')}>{location}</Text>
        <Icon.ChevronDown height="20" width="20" stroke="black" onPress={() => navigation.navigate('LocationModal')} />
        
    </View>
    <TouchableOpacity
    className = "justify-end items-end flex-1 pr-2"
     onPress={() => Linking.openURL('tel:+919820122602')} >
    <Image source={require('../assets/freepik/siren.png')} style={{width: 30, height: 30}} 
   />
    </TouchableOpacity>
    </View>
   <ScrollView 
    horizontal={false}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom: 100}}>
    {/* <View className = "flex-row items-center space-x-2 px-4 pb-2">
     <TouchableWithoutFeedback
     onPress={() => navigation.navigate('Search')}
     >
         <View className = " flex-row flex-1 items-center p-3 rounded-2xl border border-gray-300">
             <Icon.Search height="20" width="20" stroke="gray" />
             <TextInput editable={false} placeholder="Search" className = "flex-1 ml-2" />
         </View>
     </TouchableWithoutFeedback>
     <View className = "p-3 rounded-full">
         <Icon.Sliders height="20" width="20" stroke="black" />
     </View>
     </View> */}


     <View className="flex-row justify-evenly pt-5">
      <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Help')}
      >
        <Image source={require('../assets/freepik/help.png')} style={{width: 117, height: 138, borderRadius: 10}} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Adopt')}
      >
        <Image source={require('../assets/freepik/adopt.png')} style={{width: 117, height: 138, borderRadius:10}} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Donate')}
      >
        <Image source={require('../assets/freepik/donate.png')} style={{width: 117, height: 138,borderRadius:10}} />
      </TouchableWithoutFeedback>
     </View>
     <View className="pt-7 pl-5">
      <Text className="font-medium text-lg text-gray-500">Help near you</Text>
     </View>
    {/*main*/}
  
    <HelpNearBy />
 
    </ScrollView>
 </SafeAreaView>
  )
}