import { View, Text,Image, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, RefreshControl  } from 'react-native'
import React,{useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icons from 'react-native-feather'
import { useNavigation } from '@react-navigation/native';
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import { Dropdown } from 'react-native-element-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Linking from 'expo-linking';
import sanityClient from '../sanity';

//Category Data
const categoryData = [
  { label: 'Rescue', value: 'Rescue' },
  { label: 'Vet', value: 'Vet' },
  { label: 'Ambulance', value: 'Ambulance' },
  { label: 'Animal Shelter', value: 'Animal Shelter' },
  { label: 'Animal Birth Control', value: 'Animal Birth Control' },
];


export default function AddHelpScreen() {

    const [isFocus, setIsFocus] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [map, setMap] = useState('');
  const [comments, setComments] = useState('');

    const pullMe = async () => {
      setRefresh(true)
      setName('');
      setCategory('');
      setComments('');
     
      setRefresh(false);
      }
  
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
      if (map === null) {
        alert('Please enter your name');
        return;
      }
      if (category === null) {
        alert('Please choose category');
        return;
      }
      handleSubmit();
      setName('');
      setCategory('');
      setComments('');
    };

    

    const handleSubmit = async () => {
      const emails = 'ashrrithk+straysahaya@gmail.com'
      const subject = `Add Help Center - ${name}`;
      const body = `Hi,
      I would like to add a help center to StraySahaya. Please find the details below.

      ---------------------------------
      Center Name: ${name}
      Google Maps: ${map}
      Category: ${category}
      Comments: ${comments}

      Thank you.
      `;
      const mailtoLink = `mailto:${emails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      Linking.openURL(mailtoLink);
      
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
      <Text className="font-medium text-xl mr-10 mb-2 ">Add Help Center</Text>
      </View>
      </View>
      <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl
       refreshing={refresh}
        onRefresh={()=>pullMe()} 
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
      onChangeText={(item) => setName(item)}/>

     <Text className="ml-5 mt-5 text-md">Google Map Link</Text>
      <TextInput 
      variant="outlined" 
      value={map} 
      style={{marginLeft: 16, marginRight:16, marginBottom: 10, marginTop:10,}} 
      color='#000000'
      onChangeText={(item) => setMap(item)}/>
      
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
<Text className="ml-5 mt-4 text-md">Comments</Text>
  <TextInput 
  variant="outlined" 
  value={comments} 
  style={{marginLeft: 16, marginRight:16, marginBottom: 10,marginTop:10, height:100}} 
  color='#000000' 
  textAlignVertical='center'
  onChangeText={(item) => setComments(item)}
  
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