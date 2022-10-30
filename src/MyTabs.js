import React from 'react';
import BookMark from './BookMark';
import History from './History';
import {HomeScreen} from './Home';
import SettingsScreen from './SettingsScreen';
import {MyTabBar} from './MyTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="BookMark" component={BookMark} /> */}
    </Tab.Navigator>
  );
}
