import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  RefreshControl,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icons from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { themeColors } from "../themes/index";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setLocation,
  setPhone,
  setAnimalType,
  setCategory,
  setComments,
  setImage,
} from "../redux/slice/helpSlice";
import { setHelpData } from "../redux/slice/homeSlice";
import PostHelpScreen from "./PostHelpScreen";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { getHelpData } from "../api";
import sanityClient from "../sanity";

//Type of Animal Data

export const animalTypeData = [
  { label: "Dog", value: "Dog" },
  { label: "Cat", value: "Cat" },
  { label: "Pig", value: "Pig" },
  { label: "Rabbit", value: "Rabbit" },
  { label: "Duck", value: "Duck" },
  { label: "Hen", value: "Hen" },
  { label: "Horse", value: "Horse" },
  { label: "Donkey", value: "Donkey" },
  { label: "Cow", value: "Cow" },
  { label: "Ox", value: "Ox" },
  { label: "Bull", value: "Bull" },
  { label: "Bird", value: "Bird" },
  { label: "Others", value: "Others" },
];

//Category Data
const categoryData = [
  { label: "Rescue", value: "Rescue" },
  { label: "Abandoned Pet", value: "Abandoned Pet" },
  { label: "Abuse", value: "Abuse" },
  { label: "Animal Birth Control", value: "Animal Birth Control" },
];

//Indian Phone Number Regex
const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

export default function HelpScreen() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [refresh, setRefresh] = useState(false);

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

  const helpData = useSelector((state) => state.home.helpData);

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
    fetchUserLastKnownLocation();
    if (helpData.length == 0) {
      getHelpData().then((data) => {
        dispatch(setHelpData(data));
        console.log(data);
      });
    }
  }, [helpData]);

  //Fetch user's current location
  const fetchUserCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    // Get the user's current location
    let curLocation = await Location.getCurrentPositionAsync({});
    console.log(curLocation);

    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: curLocation.coords.longitude,
      latitude: curLocation.coords.latitude,
    });
    console.log(reverseGeocodedAddress);
    if (reverseGeocodedAddress.length > 0) {
      const { name, district, city, region, postalCode } =
        reverseGeocodedAddress[0];
      dispatch(setLocation(`${name}, ${city}, ${region} ${postalCode}`));
    }
  };

  //Fetch user's last known location
  const fetchUserLastKnownLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let lastLocation = await Location.getLastKnownPositionAsync({});
    console.log(lastLocation);

    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: lastLocation.coords.longitude,
      latitude: lastLocation.coords.latitude,
    });
    console.log(reverseGeocodedAddress);
    if (reverseGeocodedAddress.length > 0) {
      const { name, district, city, region, postalCode } =
        reverseGeocodedAddress[0];
      dispatch(setLocation(`${name}, ${city}, ${region} ${postalCode}`));
    }
  };

  let userLoc = "Fetching Location..";
  if (errorMsg) {
    userLoc = errorMsg;
  } else if (location) {
    userLoc = JSON.stringify(location).replace(/^"(.*)"$/, "$1");
  }

  const pullMe = async () => {
    setRefresh(true);
    dispatch(setName(""));
    dispatch(setImage(""));
    dispatch(setLocation(""));
    dispatch(setPhone(""));
    dispatch(setAnimalType(""));
    dispatch(setCategory(""));
    dispatch(setComments(""));
    await fetchUserLastKnownLocation();
    setRefresh(false);
  };

  {
    /* Image upload */
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      dispatch(setImage(result.assets[0].uri));
    }
  };
  const checkTextInput = () => {
    //Check for the TextInput
    // if (image === null) {
    //   alert('Please choose an image');
    //   return;
    // }
    if (name === null) {
      alert("Please enter your name");
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
      alert("Please choose animal type");
      return;
    }
    if (category === null) {
      alert("Please choose category");
      return;
    }
    handleSubmit();
    dispatch(setName(""));
    dispatch(setImage(""));
    dispatch(setLocation(""));
    dispatch(setPhone(""));
    dispatch(setAnimalType(""));
    dispatch(setCategory(""));
    dispatch(setComments(""));
  };
  // const handleFormSubmit = () => {
  //   // Code to handle form submission
  //   const emails = helpData
  //   .filter(item => item.category === category)
  //   .map(item => item.email);
  //     handleSubmit();
  //   };
  //   const emails = helpData
  // .filter(item => item.category === category)
  // .map(item => item.email);

  const handleSubmit = async () => {
    try {
      let query = "";
      if (
        category === "Rescue" ||
        category === "Abandoned Pet" ||
        category === "Abuse"
      ) {
        query = `*[_type == "help" && category == "Rescue"]{email}`;
      } else {
        query = `*[_type == "help" && category == "${category}"]{email}`;
      }
      const result = await sanityClient.fetch(query);
      const emails = result.map((item) => item.email).join(",");
      console.log("Emails");
      console.log(emails);
      const subject = `Help!  ${animalType} - ${category}`;
      const body = `Hi,
      My Name is ${name}. Request your support to help a ${animalType}
      Please find my details and the location of the animal below.

      ---------------------------------
      Phone: ${phone}
      Address: ${location}
      Message: ${comments}

      Looking forward to your support.
      Thank you.

      Sent via StraySahaya App
      `;
      const mailtoLink = `mailto:${emails}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      Linking.openURL(mailtoLink);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} className="h-full">
      <View className="flex-row items-center mt-3">
        <TouchableOpacity
          className="pl-4"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icons.ArrowLeft height="28" width="28" stroke="black" />
        </TouchableOpacity>
        <View className="flex-grow items-center">
          <Text className="font-medium text-xl mr-10 mb-2 ">Help</Text>
        </View>
      </View>
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }
      >
        <View className="flex-col justify-evenly pt-5">
          {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

  
  {image && <Image source={{ uri: image }} style={{ width: 400, height: 250, borderRadius: 10 }} />}
      <TouchableOpacity className="flex-row items-center justify-center h-16 w-16 mt-5 rounded-full bg-text"
      onPress={pickImage}
      >
      <Icons.Image height= '25' width= '25' stroke= "white" />
      </TouchableOpacity>
      
  </View> */}

          {/* Name input */}
          <Text className="ml-5 mt-5 text-md">Name</Text>
          <TextInput
            variant="outlined"
            value={name}
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginBottom: 10,
              marginTop: 10,
            }}
            color="#000000"
            onChangeText={(item) => dispatch(setName(item))}
          />

          {/* Location input */}
          <Text className="ml-5 text-md">Address</Text>
          <View className="flex-row">
            <TextInput
              variant="outlined"
              // label="Address"
              value={location}
              style={{
                marginLeft: 16,
                marginRight: 16,
                marginBottom: 10,
                marginTop: 10,
                flex: 1,
              }}
              color="#000000"
              editable={true}
              onChangeText={(item) => dispatch(setLocation(item.value))}
            />
            <TouchableOpacity
              className="mr-3 justify-center"
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
              keyboardType="phone-pad"
              // label="Phone"
              value={phone}
              style={{
                marginLeft: 16,
                marginRight: 16,
                marginBottom: 10,
                marginTop: 10,
              }}
              color="#000000"
              maxLength={10}
              onChangeText={(item) => dispatch(setPhone(item))}
            />
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
            style={[styles.dropdown, isFocus && { borderColor: "black" }]}
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
            onChange={(item) => {
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
            style={[styles.dropdown, isFocus && { borderColor: "black" }]}
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
            onChange={(item) => {
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
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginBottom: 10,
              marginTop: 10,
              height: 100,
            }}
            color="#000000"
            textAlignVertical="center"
            onChangeText={(item) => dispatch(setComments(item))}
          />
        </View>
        <View className="items-center mb-5">
          <TouchableOpacity
            className="h-14 w-10/12 bg-text rounded-lg items-center justify-center"
            onPress={checkTextInput}
          >
            <Text className="text-white items-center justify-center font-semibold text-lg">
              Get Help
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
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
    borderColor: "gray",
    borderWidth: 0.8,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: "white",
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
