import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import  {Provider, useDispatch} from "react-redux";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useColorScheme } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthenticationNavigator, Onboarding , Welcome} from './src/Authentication';
import themeReducer from './redux/themeReducer';
import { SWITCH_THEME } from './redux/themeAction';


import { switchTheme } from './redux/themeAction';
import { darkTheme, lightTheme } from './assets/Theme';
import { Routes } from './src/components/Navigation';

import { 
 
  FiraSans_400Regular,
  FiraSans_400Regular_Italic,
  FiraSans_600SemiBold,
  FiraSans_600SemiBold_Italic,
  FiraSans_700Bold,
  FiraSans_700Bold_Italic,
  FiraSans_900Black,
  FiraSans_900Black_Italic 
} from '@expo-google-fonts/fira-sans'


const store = createStore(combineReducers({themeReducer,}),applyMiddleware(thunk))



export default function App() {
  
  const colorScheme = useColorScheme();
  console.log(colorScheme),
  colorScheme=='dark' ? store.dispatch(switchTheme(darkTheme))  : store.dispatch(switchTheme(lightTheme))
  let [fontsLoaded, error] = useFonts({
    
      FiraSans_400Regular,
      FiraSans_600SemiBold,
      FiraSans_700Bold,
      FiraSans_900Black,
      'SFPro_Bold': require('./assets/fonts/SFProDisplay-Bold.ttf'),
      'SFPro_Semibold': require('./assets/fonts/SFProDisplay-Semibold.ttf'),
      'SFPro_Regular': require('./assets/fonts/SFProDisplay-Regular.ttf'),
      'SFPro_Heavy': require('./assets/fonts/SFProDisplay-Heavy.ttf'),


      
  })
  if (!fontsLoaded)
  {
    return <AppLoading/>
  }
  return (
    <Provider store={store}>
    <NavigationContainer  >
     
      <AuthenticationNavigator/>
    </NavigationContainer>
    </Provider>
    
  );
};


