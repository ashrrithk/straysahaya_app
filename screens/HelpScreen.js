import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView  } from 'react-native'
import { TextInputMask } from 'react-native-masked-text';
import React,{useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icons from 'react-native-feather'
import { useNavigation } from '@react-navigation/native';
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { themeColors } from '../themes/index';
import { useDispatch,  useSelector } from 'react-redux';
import { setName, setLocation, setPhone, setAnimalType, setCategory, setComments } from '../redux/slice/helpSlice';
import PostHelpScreen from './PostHelpScreen';
import * as Location from 'expo-location';


//Type of Animal Data
const animalTypeData = [
  { label: 'Dog', value: 'Dog' },
  { label: 'Cat', value: 'Cat' },
  { label: 'Pig', value: 'Pig' },
  { label: 'Rabbit', value: 'Rabbit' },
  { label: 'Duck', value: 'Duck' },
  { label: 'Hen', value: 'Hen' },
  { label: 'Horse', value: 'Horse' },
  { label: 'Donkey', value: 'Donkey' },
  { label: 'Cow', value: 'Cow' },
  { label: 'Ox', value: 'Ox' },
  { label: 'Bull', value: 'Bull' },
  { label: 'Bird', value: 'Bird' },
  { label: 'Others', value: 'Others' },
];

//Category Data
const categoryData = [
  { label: 'Rescue', value: 'Rescue' },
  { label: 'Adoption', value: 'Adoption' },
  { label: 'Abuse', value: 'Abuse' },
  { label: 'Animal Birth Control', value: 'Animal Birth Control' },
];

//Indian Phone Number Regex
const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;





export default function HelpScreen() {

  const [errorMsg, setErrorMsg] = useState(null);


    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const name = useSelector((state) => state.help.name);
    const location = useSelector((state) => state.help.location);
    const phone = useSelector((state) => state.help.phone);
    const animalType = useSelector((state) => state.help.animalType);
    const category = useSelector((state) => state.help.category);
    const comments = useSelector((state) => state.help.comments);
  
    // const renderLabel = () => {
    //   if (value || isFocus) {
    //     return (
    //       <Text style={[styles.label, isFocus && { color: 'black' }]}>
    //         Animal Category
    //       </Text>
    //     );
    //   }
    //   return null;
    // };


//Fetch user's location
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
         // Get the user's current location
    let curLocation = await Location.getCurrentPositionAsync({});
    console.log(curLocation)

    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: curLocation.coords.longitude,
      latitude: curLocation.coords.latitude,
      
    });
    console.log(reverseGeocodedAddress)
    if (reverseGeocodedAddress.length > 0) {
      const {name, district, city, region, postalCode } = reverseGeocodedAddress[0];
      dispatch(setLocation(`${name}, ${district}, ${city}, ${region} ${postalCode}`));
    }
      })(); 
    }, []);

    
    // // // Extract and format the address details
  
  

    // useEffect(() => {
    //   if (location) {
    //     (async () => {
    //       const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
    //         latitude: location.coords.latitude,
    //         longitude: location.coords.longitude,
    //       });
    //       dispatch(setLocation(reverseGeocodedAddress.name));
    //     })();
    //   }
    // }, [location]);
  
    // const reverseGeocode = async () => {
    //   const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //   })
    // }

    let userLoc = 'Fetching Location..';
    if (errorMsg) {
      userLoc = errorMsg;
    } else if (location) {
      userLoc = JSON.stringify(location).replace(/^"(.*)"$/, '$1');
    }


   
  

  return (
    <SafeAreaView style={{backgroundColor: 'white'}} className="h-full">
    <View className="flex-row items-center mt-3">
        <TouchableOpacity className="pl-4"
        onPress={() => {navigation.goBack()}}
        >
            <Icons.ArrowLeft height= '25' width= '25' stroke= "black" />
        </TouchableOpacity>
        <View className="flex-grow items-center">
      <Text className="font-medium text-xl mr-10 ">Help</Text>
      </View>
      </View>
      <ScrollView 
    horizontal={false}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom: 10}}>
      <View className="flex-col justify-evenly pt-5">
     
      {/* TODO: Fix label overlapping issue */}
      {/* Name input */}
      <TextInput 
      variant="outlined" 
      label="Name" 
      value={name} 
      style={{ margin: 16}} 
      color='#000000' 
      onChange={(item) => dispatch(setName(item.value))}/>

      {/* Location input */}
      <TextInput 
      variant="outlined" 
      label="Address" 
      value={userLoc}  
      style={{ margin: 16}} 
      color='#000000'
      editable={true}
      onChangeText={(item) => dispatch(setLocation(item.value))} />
      
      {/* Phone input */}
      <TextInput 
      variant="outlined" 
      keyboardType='phone-pad' 
      label="Phone" 
      value={phone}  
      style={{ margin: 16}} 
      color='#000000' 
      maxLength={10} 
      onChange={(item) => dispatch(setPhone(item.value))} />
      {/* <TextInputMask
          type={'custom'}
          options={{
            mask: '9999999999',
          }}
          value={phone}
          onChangeText={(text) => dispatch(setPhone(text))}
          style={{ margin: 16, height: 50, justifyContent: 'center', borderColor: '#000000', borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
          placeholder="Phone"
          keyboardType="phone-pad"
        /> */}
    </View>
    {/* TODO: Add image and video upload */}
    <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={animalTypeData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Animal Type'}
          searchPlaceholder="Search..."
          value={animalType}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setAnimalType(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'black' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
      <View style={styles.container}>

<Dropdown
  style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
  placeholderStyle={styles.placeholderStyle}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  iconStyle={styles.iconStyle}
  data={categoryData}
  search
  maxHeight={300}
  labelField="label"
  valueField="value"
  placeholder={'Category'}
  searchPlaceholder="Search..."
  value={category}
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  onChange={item => {
    setCategory(item.value);
    setIsFocus(false);
  }}
  // renderLeftIcon={() => (
  //   <AntDesign
  //     style={styles.icon}
  //     color={isFocus ? 'black' : 'black'}
  //     name="Safety"
  //     size={20}
  //   />
  // )}
/>
</View>

<View>
  {/* <TextInput
  multiline={true}
  color='#000000'
  value={comments}
  variant="outlined"
  label="Comments"
  onChange={(item) => dispatch(setComments(item.value))}
  className=""
  ></TextInput> */}
  <TextInput 
  variant="outlined" 
  label="Comments" 
  value={comments} 
  multiline={true} 
  style={{paddingTop:10, margin: 16, height:150, justifyContent: 'flex-start'}} 
  color='#000000' 
  onChange={(item) => dispatch(setComments(item.value))}
  
  />

</View>
<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
<View className="items-center">
  <TouchableOpacity className="h-14 w-10/12 bg-text rounded-lg items-center justify-center"
  onPress={() => {navigation.navigate('PostHelp')}}
  >
<Text className="text-white items-center justify-center font-semibold text-lg">Get Help</Text>
  </TouchableOpacity>
</View>
</KeyboardAvoidingView>
</ScrollView>
    </SafeAreaView>
  )
  }

  const styles = StyleSheet.create({
    container: {
      margin: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.8,
      borderRadius: 5,
      paddingHorizontal: 8,
      backgroundColor: 'white',
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      
    },
    selectedTextStyle: {
      fontSize: 16,
      paddingLeft: 7,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });