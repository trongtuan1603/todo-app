import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useTaskDetail from '../hooks/useTaskDetail';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/colors';
import CheckBox from '@react-native-community/checkbox';

const TaskDetailScreen = () => {
  const {
    task,
    onGoBack,
    handleToggleStatus,
    onUpdateTaskTitle,
    onUpdateTaskDescription,
    handleRemoveTask,
    handleUpdateTaskImportant,
  } = useTaskDetail();

  if (task == null) return null;

  const isImportantTask = !!task.important;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity hitSlop={{right: 20, left: 20}} onPress={onGoBack}>
          <FontAwesome name="angle-left" size={30} />
        </TouchableOpacity>
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={handleUpdateTaskImportant}>
            <FontAwesome
              name={isImportantTask ? 'star' : 'star-o'}
              color={isImportantTask ? Colors.primary : undefined}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRemoveTask}
            style={styles.headerDeleteBtn}>
            <FontAwesome name="trash-o" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <CheckBox
            value={task.isCompleted}
            onChange={_ => handleToggleStatus(task)}
            tintColors={{true: Colors.primary, false: Colors.gray}}
          />
          <TextInput
            value={task.title}
            onChangeText={onUpdateTaskTitle}
            style={[
              styles.taskTitle,
              task.isCompleted && styles.completedTitle,
            ]}
          />
        </View>
        <TextInput
          style={styles.taskDescription}
          value={task.description}
          onChangeText={onUpdateTaskDescription}
          multiline
        />
      </View>
    </ScrollView>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },

  header: {
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.grayBackground,
    borderBottomWidth: 1,
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  headerDeleteBtn: {
    marginLeft: 25,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  taskTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    marginLeft: 3,
    color: Colors.black,
    width: '100%',
    textDecorationLine: 'none',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  taskDescription: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.black,
  },
});
