import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AllScreen from '../screens/AllScreen';
import HomeScreen from '../screens/HomeScreen';
import Colors from '../styles/colors';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: Colors.primary,
        },
      }}>
      <Tab.Screen name="Today" component={HomeScreen} />
      <Tab.Screen name="All" component={AllScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
