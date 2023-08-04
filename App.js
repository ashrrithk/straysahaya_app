import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

//Screens
import Navigation from './navigation';
import HelpScreen from './screens/HelpScreen';
import AdoptScreen from './screens/AdoptScreen';
import DonateScreen from './screens/DonateScreen';
import SearchScreen from './screens/SearchScreen';
import AuthScreen from './screens/AuthScreen';


//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostHelpScreen from './screens/PostHelpScreen';
import HomeScreen from './screens/HomeScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
<Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Nav" component={Navigation} />
        <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Help" component={HelpScreen}  />
          <Stack.Screen name="Adopt" component={AdoptScreen} />
          <Stack.Screen name="Donate" component={DonateScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="PostHelp" component={PostHelpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
</Provider>
     
    
  );
}