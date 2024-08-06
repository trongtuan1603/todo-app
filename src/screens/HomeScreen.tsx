import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import AddTaskView from '../components/AddTaskModal';
import TaskItem from '../components/TaskItem';
import useHome from '../hooks/useHome';

const HomeScreen = () => {
  const {tasks, handleRemoveTask} = useHome();

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskItem
            data={item}
            onCheckDone={() => {}}
            onRemoveTask={handleRemoveTask}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
