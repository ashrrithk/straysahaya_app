import { View, Text, ScrollView, Image, RefreshControl } from 'react-native'
import React, {useState,useEffect} from 'react'
import { ngos } from '../constants';
import NgoCard from './ngoCard';
import * as Location from 'expo-location';
import { setDistance, setHelpData } from '../redux/slice/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getHelpData } from '../api';

export default function HelpNearBy() {
  const [sortedNgos, setSortedNgos] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refreshing, setRefreshing] = useState(true);

  const dispatch = useDispatch()
  const distance = useSelector((state) => state.home.distance);
  const helpData= useSelector((state) => state.home.helpData);
  
  useEffect(() => {
    fetchUserCurrentLocation()
    if(helpData.length==0){
    getHelpData().then(data=>{
     dispatch(setHelpData(data));
     console.log(data)
     
  })
}
  }, [helpData])
  
    const fetchUserCurrentLocation = async () => {
        
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    // Get user's current location
    
    function getCurrentLocation() {
      const timeout = 5000;
      return new Promise(async (resolve, reject) => {
        setTimeout(() => { reject(new Error(`Error getting gps location after ${(timeout * 2) / 1000} s`)) }, timeout * 2);
        setTimeout(async () => { resolve(await Location.getCurrentPositionAsync()) }, timeout);
        resolve(await Location.getLastKnownPositionAsync());
      });
    }
    let curLocation = await getCurrentLocation();
    console.log("Current Location")
    console.log(curLocation)

    // const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
    //   longitude: curLocation.coords.longitude,
    //   latitude: curLocation.coords.latitude,

    // });
    // console.log(reverseGeocodedAddress)
    // if (reverseGeocodedAddress.length > 0) {
    //   const {name, district, city, region, postalCode } = reverseGeocodedAddress[0];
    //   dispatch(setLocation(`${name}, ${district}, ${city}, ${region} ${postalCode}`));
    // }

      // Calculate distance from user's location for each NGO
      const helpDistance = helpData.map(ngo => {
        const distance = Math.sqrt(Math.pow(curLocation.coords.latitude - ngo.latitude, 2) + Math.pow(curLocation.coords.longitude - ngo.longitude, 2));
        const distanceInKms = (distance / 1000).toFixed(2);
        dispatch(setDistance(distanceInKms))
        console.log('Ngo Location')
        console.log(ngo.latitude)
        console.log(ngo.longitude)
        return { ...ngo, distance };
        
      });
       console.log("Help Distance")
        console.log(helpDistance)

        console.log('Help Data')
        console.log(helpData)

      // Sort NGOs by distance
      const sortedNgos = helpDistance.sort((a, b) => a.distance - b.distance);

      setSortedNgos(sortedNgos);
      console.log("Sorted NGOs")
      console.log(sortedNgos)
  }
  // console.log(sortedNgos)
  return (
    <View className="mt-3">
    <ScrollView
    horizontal={false}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
   contentContainerStyle={{
       paddingHorizontal: 15
       }}>
       {
           sortedNgos.map((ngo, index) => {
               return (
                    <NgoCard
                      item={ngo}
                      key={index}
                      distance={distance}
                      />
                //    <View key={index} className="flex justify-center items-center mr-6">
                      
                //       {/* <Image source={ngo.image} style={{width: 64, height: 63, borderRadius: 10}} /> */}
                //    </View>
               )
           })
       }
   </ScrollView>
   </View>
  )
}