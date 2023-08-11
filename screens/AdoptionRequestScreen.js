import { View, Text,Image, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, RefreshControl  } from 'react-native'
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
import {setEnquirerName, setEnquirerPhone, setEnquirerComments  } from '../redux/slice/adoptSlice';
import { setHelpData } from '../redux/slice/homeSlice';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { getHelpData, getAdoptionsData } from '../api';
import { useRoute } from '@react-navigation/native'
import sanityClient from '../sanity';



export default function AdoptionRequestScreen() {

  const [errorMsg, setErrorMsg] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const item = useRoute();
  const petName = item.params.name;
  const helpCenter = item.params.helpCenter;

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    
    const name = useSelector((state) => state.adopt.enquirerName);
    const phone = useSelector((state) => state.adopt.enquirerPhone);
    const comments = useSelector((state) => state.adopt.enquirerComments);
    const helpData = useSelector((state) => state.home.helpData);

    useEffect(() => {
      if(helpData.length==0){
        getHelpData().then(data=>{
         dispatch(setHelpData(data));
         console.log(data)
         
      })
    }
    }, [helpData])

  
    const checkTextInput = () => {
      //Check for the TextInput
      // if (image === null) {
      //   alert('Please choose an image');
      //   return;
      // }
      if (name === null) {
        alert('Please enter your name');
        return;
      }
      if (phone === null) {
        alert("Please enter your phone number");
        return;
      }
     
      handleSubmit();
      dispatch(setEnquirerName(''));
      dispatch(setEnquirerPhone(''));
      dispatch(setEnquirerComments(''));
    };

    

    const handleSubmit = async () => {
      try {
      let query = `*[_type == "help" && name == "${helpCenter}"]{email}`;
      const result = await sanityClient.fetch(query);
      const emails = result.map((item) => item.email).join(',');
      console.log("Emails")
      console.log(emails)
      const subject = `Adoption Request - ${petName}`;
      const body = `Hi,
      I am interested in adopting ${petName} and would like to know more about the process.

      Please find my details below.
      
      ---------------------------------
      Name: ${name}
      Phone: ${phone}
      Message: ${comments}

      Looking forward to your response.
      Thank you.

      Sent via StraySahaya App
      `;
      const mailtoLink = `mailto:${emails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      Linking.openURL(mailtoLink);
      }catch (error) {
        console.error(error);
      }
    };
    const pullMe = async () => {
      setRefresh(true)
      dispatch(setEnquirerName(''));
      dispatch(setEnquirerPhone(''));
      dispatch(setEnquirerComments(''));
      setRefresh(false);
      }

  return (
    <SafeAreaView style={{backgroundColor: 'white'}} className="h-full">
    <View className="flex-row items-center mt-3">
        <TouchableOpacity className="pl-4"
        onPress={() => {navigation.goBack()}}
        >
            <Icons.ArrowLeft height= '28' width= '28' stroke= "black" />

        </TouchableOpacity>
        <View className="flex-grow items-center">
      <Text className="font-medium text-xl mr-10 mb-2">{petName}</Text>
      </View>
      </View>
      <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl
       refreshing={refresh}
        onRefresh={() => pullMe()} 
        />
      }
      >
      
<View className="flex-col justify-evenly pt-5">
 
     
      {/* Name input */}
      <Text className="ml-5 mt-5 text-md">Name</Text>
      <TextInput 
      variant="outlined" 
      value={name} 
      style={{marginLeft: 16, marginRight:16, marginBottom: 10, marginTop:10,}} 
      color='#000000'
      onChangeText={(item) => dispatch(setEnquirerName(item))}/>

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
      onChangeText={(item) => dispatch(setEnquirerPhone(item))} />
      </View>
    </View>


<View>
<Text className="ml-5 mt-4 text-md">Comments</Text>
  <TextInput 
  variant="outlined" 
  value={comments} 
  style={{marginLeft: 16, marginRight:16, marginBottom: 10,marginTop:10, height:100}} 
  color='#000000' 
  textAlignVertical='center'
  onChangeText={(item) => dispatch(setEnquirerComments(item))}
  
  />
</View>
<View className="items-center mb-5">
  <TouchableOpacity className="h-14 w-10/12 bg-text rounded-lg items-center justify-center"
  onPress={checkTextInput}
  >
<Text className="text-white items-center justify-center font-semibold text-lg">Submit</Text>
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