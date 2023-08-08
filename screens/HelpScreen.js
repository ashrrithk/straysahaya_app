import { View, Text,Image, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert  } from 'react-native'
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
import { setName, setLocation, setPhone, setAnimalType, setCategory, setComments, setImage } from '../redux/slice/helpSlice';
import PostHelpScreen from './PostHelpScreen';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';




//Type of Animal Data

export const animalTypeData = [
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
  { label: 'Abandoned Pet', value: 'Abandoned Pet' },
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
    
    const image = useSelector((state) => state.help.image);
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

    useEffect(() => {
      fetchUserCurrentLocation()
    }, [])

//Fetch user's location
      const fetchUserCurrentLocation = async () => {
        
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
      };
    

    
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
  
     {/* Image upload */}
     const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Image,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result)

      if(!result.canceled){
        dispatch(setImage(result.assets[0].uri));
      }
    };
    const checkTextInput = () => {
      //Check for the TextInput
      if (image === null) {
        alert('Please choose an image');
        return;
      }
      if (name === null) {
        alert('Please enter your name');
        return;
      }
      if (location === null) {
        alert("Please enter animal's location");
        return;
      }

      if (phone === null) {
        alert("Please enter your phone number");
        return;
      }
     
      if (animalType === null) {
        alert('Please choose animal type');
        return;
      }
      if (category === null) {
        alert('Please choose category');
        return;
      }
      dispatch(setName(''));
      dispatch(setImage(''));
      dispatch(setLocation(''));
      dispatch(setPhone(''));
      dispatch(setAnimalType(''));
      dispatch(setCategory(''));
      dispatch(setComments(''));
      handleSubmit();
    };

    const handleSubmit = () => {
      navigation.navigate('PostHelp');
    };
   
  

  return (
    <SafeAreaView style={{backgroundColor: 'white'}} className="h-full">
    <View className="flex-row items-center mt-3">
        <TouchableOpacity className="pl-4"
        onPress={() => {navigation.goBack()}}
        >
            <Icons.ArrowLeft height= '28' width= '28' stroke= "black" />

        </TouchableOpacity>
        <View className="flex-grow items-center">
      <Text className="font-medium text-xl mr-10 mb-2 ">Help</Text>
      </View>
      </View>
      <KeyboardAwareScrollView>
      
<View className="flex-col justify-evenly pt-5">
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

  {/* Image selection */}
  {image && <Image source={{ uri: image }} style={{ width: 400, height: 250, borderRadius: 10 }} />}
      <TouchableOpacity className="flex-row items-center justify-center h-16 w-16 mt-5 rounded-full bg-text"
      onPress={pickImage}
      >
      <Icons.Image height= '25' width= '25' stroke= "white" />
      </TouchableOpacity>
      
  </View>
 
     
      {/* Name input */}
      <Text className="ml-5 mt-5 text-md">Name</Text>
      <TextInput 
      variant="outlined" 
      value={name} 
      style={{marginLeft: 16, marginRight:16, marginBottom: 10, marginTop:10,}} 
      color='#000000'
      onChange={(item) => dispatch(setName(item.value))}/>

      {/* Location input */}
      <Text className="ml-5 text-md">Address</Text>
      <View className="flex-row">
      <TextInput
      variant="outlined"
      // label="Address"
      value={location}
      style={{ marginLeft: 16, marginRight:16, marginBottom: 10,marginTop:10, flex: 1}}
      color='#000000'
      editable={true}
      onChangeText={(item) => dispatch(setLocation(item.value))}
       />
       <TouchableOpacity className="mr-3 justify-center"
       onPress={fetchUserCurrentLocation}
       >
        <Ionicons name="locate-sharp" size={26} color="black" />
        
       {/* <Icons.Navigation height= '25' width= '25' stroke= "black" /> */}

       </TouchableOpacity>
       </View>
      {/* Phone input */}
      <View>
      <Text className="ml-5 text-md">Phone</Text>
      <TextInput 
      variant="outlined" 
      keyboardType='phone-pad' 
      // label="Phone" 
      value={phone}  
      style={{ marginLeft: 16, marginRight:16, marginBottom: 10,marginTop:10,}} 
      color='#000000' 
      maxLength={10} 
      onChange={(item) => dispatch(setPhone(item.value))} />
      </View>
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

    <View style={styles.container}>
    <Text className="ml-1 mb-2 text-md">Animal Type</Text>
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
          searchPlaceholder="Search..."
          value={animalType}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            dispatch(setAnimalType(item.value));
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
<Text className="ml-1 mb-2 text-md">Category</Text>
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
  // placeholder={'Category'}
  searchPlaceholder="Search..."
  value={category}
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  onChange={item => {
    dispatch(setCategory(item.value));
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
<Text className="ml-5 mt-4 text-md">Comments</Text>
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
  value={comments} 
  style={{marginLeft: 16, marginRight:16, marginBottom: 10,marginTop:10, height:100}} 
  color='#000000' 
  textAlignVertical='center'
  onChange={(item) => dispatch(setComments(item.value))}
  
  />
</View>
<View className="items-center mb-5">
  <TouchableOpacity className="h-14 w-10/12 bg-text rounded-lg items-center justify-center"
  onPress={checkTextInput}
  >
<Text className="text-white items-center justify-center font-semibold text-lg">Get Help</Text>
  </TouchableOpacity>
</View>

</KeyboardAwareScrollView>
    </SafeAreaView>
  )
  }

  const styles = StyleSheet.create({
    container: {
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 10,
      marginTop: 10,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.8,
      borderRadius: 5,
      paddingHorizontal: 8,
      backgroundColor: 'white',
      marginBottom: 10,
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