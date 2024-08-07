import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ITask} from '../utils/types';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TaskItemProps = {
  onToggleStatus?: (task: ITask) => void;
  onRemoveTask: (task: ITask) => void;
  onLongPress?: () => void;
  isDragging?: boolean;
  data: ITask;
};

const TaskItem = ({
  data,
  isDragging,
  onLongPress,
  onToggleStatus,
}: TaskItemProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.taskItem,
        isDragging && styles.taskItemDragging,
        data.isCompleted && styles.completedStyle,
      ]}
      onLongPress={onLongPress}>
      <CheckBox
        value={data.isCompleted}
        onChange={_ => {
          onToggleStatus?.(data);
        }}
        tintColors={{true: Colors.primary, false: Colors.gray}}
      />
      <View style={styles.taskInfo}>
        <Text
          style={[styles.taskTitle, data.isCompleted && styles.completedTitle]}
          numberOfLines={1}>
          {data.title}
        </Text>
      </View>
      <TouchableOpacity style={styles.optionButton}>
        <Ionicons name="ellipsis-vertical" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    paddingLeft: 14,
    height: 45,
    alignItems: 'center',
  },
  taskItemDragging: {
    opacity: 0.5,
    backgroundColor: Colors.white,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
    fontFamily: 'Inter-Medium',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
  taskInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 2,
  },
  description: {
    fontSize: 12,
    color: Colors.black,
  },
  optionButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedStyle: {
    opacity: 0.4,
  },
});
