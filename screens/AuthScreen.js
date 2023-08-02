// import { View, Text, SafeAreaView, Image, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
// import React, {useState, useEffect} from 'react'
// import * as Icon from 'react-native-feather'
// import { SvgUri } from 'react-native-svg'
// import Google_login from '../assets/google_login.svg'
// import Apple_login from '../assets/apple_login.svg'
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// // import {EXPO_PUBLIC_ANDROID_CLIENT_ID, EXPO_PUBLIC_IOS_CLIENT_ID} from '@env'
// import { GoogleSignin } from '@react-native-google-signin/google-signin'
// import auth from '@react-native-firebase/auth';

// WebBrowser.maybeCompleteAuthSession();


// export default function AuthScreen() {

//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();
//   const navigation = useNavigation();

//   GoogleSignin.configure({
//   });

//     // Handle user state changes
//     function onAuthStateChanged(user) {
//       setUser(user);
//       if (initializing) setInitializing(false);
//     }
  
//     useEffect(() => {
//       const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//       return subscriber; // unsubscribe on unmount
//     }, []);

//     const onGoogleButtonPress = async () => {
//       // Check if your device supports Google Play
//       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//       // Get the users ID token
//       const { idToken } = await GoogleSignin.signIn();
    
//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
//       // Sign-in the user with the credential
//       return auth().signInWithCredential(googleCredential);
//     }
  
//     if (initializing) return null;
  
//     if(!user){
//   return (
//     <SafeAreaView className="bg-primary min-h-screen flex">
//       <View className="flex justify-center items-center">
//       {/* Heading */}
//       <View>
//       <Text className="text-5xl text-center mt-20 font-display font-medium">StraySahaya</Text>
//       <Text className="text-center mt-2 font-normal text-opacity-70">Rescue · Adopt · Donate</Text>
//       </View>

//       {/* Image */}
//       <View>
//         <Image source={require('../assets/freepik/auth_img.jpg')} className="h-80 w-80 mt-16" />
//       </View>

//       {/* Google Login */}
//       <View className="mt-16">
//        <TouchableWithoutFeedback
//        onPress={onGoogleButtonPress}
//        >
//        <Google_login />
//        </TouchableWithoutFeedback>
//        {/* <Button title="Sign In" onPress={promptAsync} /> */}
//       </View>

//       {/* Apple Login */}
//       {/* <View style={{alignSelf:'center'}} className="bg-danger">
//       <TouchableWithoutFeedback
//       onPress={() => console.log('Apple')}
//        >
//        <Apple_login />
//        </TouchableWithoutFeedback>
//       </View> */}

//       </View>

//       </SafeAreaView>
//   )
// } else{
// return (
//   <View>
//     navigation.navigate('Home');
//   </View>
// )
// }
// }