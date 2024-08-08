import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import {AppStackParamsList} from '../utils/types';

const Stack = createNativeStackNavigator<AppStackParamsList>();

const AppNavigator = () => {
  return <RootNavigator />;
};

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;
