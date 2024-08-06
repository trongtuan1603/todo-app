import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ITask} from '../utils/types';
import CheckBox from '@react-native-community/checkbox';

type TaskItemProps = {
  onCheckDone: (task: ITask) => void;
  onRemoveTask: (task: ITask) => void;
  data: ITask;
};

const TaskItem = ({onRemoveTask, data}: TaskItemProps) => {
  return (
    <View style={styles.taskItem}>
      <CheckBox />
      <Text style={styles.taskTitle}>{data.title}</Text>
      <Button title="Remove" onPress={() => onRemoveTask(data)} />
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  taskTitle: {
    flex: 1,
  },
});
