import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';

export default function App() {
  return (
    <AppContainer />
  
  );
}
const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Chat: ChatScreen
  },
  {
    headerMode: "none"
  }
)
const AppContainer = createAppContainer(AppNavigator)
