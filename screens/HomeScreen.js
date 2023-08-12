import { View, Text,TouchableWithoutFeedback, TextInput, ScrollView,Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, {useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from 'react-native-feather'
import * as Linking from 'expo-linking'
import { useNavigation } from '@react-navigation/native';
import { ngos } from '../constants'
import HelpNearBy from '../components/helpNearBy'
import { useDispatch, useSelector } from 'react-redux';
import { setDistance, setLocation, setErrorMsg, setHelpData, setGeoLoc } from '../redux/slice/homeSlice';
import * as Location from 'expo-location';
import { getHelpData } from '../api';



export default function HomeScreen() {
  const navigation = useNavigation();
  const location = useSelector((state) => state.home.location);
  const errorMsg = useSelector((state) => state.home.error);
  const geoLoc  = useSelector((state) => state.home.geoLoc);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = React.useState(false);


  useEffect(() => {
    fetchUserLastKnownLocation()
  }, [])

        //Fetch user's last known location
        const fetchUserLastKnownLocation = async () => {
        
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
  
      let lastLocation = await Location.getLastKnownPositionAsync({});
      dispatch(setGeoLoc(lastLocation));
      console.log(lastLocation)
  
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: lastLocation.coords.longitude,
        latitude: lastLocation.coords.latitude,
        
      });
      console.log(reverseGeocodedAddress)
      if (reverseGeocodedAddress.length > 0) {
        const {name, district, city, region, postalCode } = reverseGeocodedAddress[0];
        dispatch(setLocation(`${name}, ${city}`));
      }
        };

  // Get user's current location
    const fetchUserCurrentLocation = async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        dispatch(setErrorMsg('Permission to access location was denied'));
        return;
      }
      let curLocation = await Location.getCurrentPositionAsync({});
      dispatch(setGeoLoc(curLocation));
      console.log(geoLoc)
  
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: curLocation.coords.longitude,
      latitude: curLocation.coords.latitude,
      
    });
    console.log(reverseGeocodedAddress)
    if (reverseGeocodedAddress.length > 0) {
      const {name, district, city, region, postalCode } = reverseGeocodedAddress[0];
      dispatch(setLocation(`${name}, ${city}`));
    }
  };

  let id = process.env.SANITY_PROJECT_ID;
  console.log('Sanity ID')
  console.log(id)

  let userLoc = 'Fetching Location..';
  if (errorMsg) {
    userLoc = errorMsg;
  } else if (location) {
    userLoc = JSON.stringify(location).replace(/^"(.*)"$/, '$1');;
  }
  console.log(userLoc)

  //Refresh
  const pullMe = async () => {
  setRefresh(true)
  try {
    await fetchUserCurrentLocation();
    await getHelpData().then(data=>{
      dispatch(setHelpData(data));
      console.log(data)
   })
  } catch (error) {
    console.log(error);
  }
  setRefresh(false);
  }

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', height:'100%'}}>
    <StatusBar barStyle="dark-content" />
    <View className = "flex-row items-center space-x-2 px-4 pb-2">
    <View  className = "flex-row items-center space-x-1 border-0 border-l-1 pl-2 pb-3 pt-3 border-gray-300">
        <Text className="text-black text-lg font-medium " onPress={() => navigation.navigate('LocationModal')}>{userLoc}</Text>
        <Icon.ChevronDown height="20" width="20" stroke="black" onPress={() => navigation.navigate('LocationModal')} />
        
    </View>
    <TouchableOpacity
    className = "justify-end items-end flex-1 pr-2"
     onPress={() => Linking.openURL('tel:+918277100200')} >
    <Image source={require('../assets/freepik/siren.png')} style={{width: 30, height: 30}} 
   />
    </TouchableOpacity>
    </View>
   <ScrollView 
    horizontal={false}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom: 100}}
    refreshControl={
      <RefreshControl
      refreshing={refresh}
      onRefresh={() => pullMe()}
      />
    }
    >
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