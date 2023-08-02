import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import OptionsScreen from './screens/OptionsScreen';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import ProfileScreen from './screens/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Linking } from 'react-native';
import { Modal } from 'react-native-web';


//Screen Names
const home = "Home";
const sos = "Options";
const profile = "Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function Navigation() {
    return (
        <Tab.Navigator
        initialRouteName={home}
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === home) {
                    iconName = 'home'
                    // return <Feather name={iconName} size={size} color={color}  />;
                } else if (route.name === sos) {
                    iconName = 'plus-square'
                    // return <Feather name={iconName} size={size} color={color}  />;
                } else if (route.name === profile) {
                    iconName = 'user'
                    // return <Feather name={iconName} size={size} color={color}  />;
                }

                return <Feather name={iconName} size={size} color={color}  />;
                // return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
            tabBarStyle: { paddingBottom: 25, paddingTop: 10, height: 80, backgroundColor: '#ffffff', borderTopWidth: 0, elevation: 0},
            tabBarActiveTintColor: '#000000',
            
            
            tabBarOptions: {
                activeTintColor: '#000000',
                inactiveTintColor: 'gray',
                labelStyle: { paddingBottom: 10,fontSize: 12,}}
                
        })}
        >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Options" options={{presentation: 'modal'}} component={OptionsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}