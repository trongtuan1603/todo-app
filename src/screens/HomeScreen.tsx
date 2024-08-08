import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../styles/colors';

import TaskList from '../components/TaskList';

const HomeScreen = () => {
  return <TaskList />;
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueWhiteBg,
  },
});
