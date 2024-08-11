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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {EditDateState} from '../utils/types';
import moment from 'moment';

const TaskDetailScreen = () => {
  const {
    task,
    showEditDate,
    handleEditDate,
    setShowEditDate,
    onGoBack,
    handleToggleStatus,
    onUpdateTaskTitle,
    onUpdateTaskDescription,
    handleRemoveTask,
    handleUpdateTaskImportant,
    onShowEditDate,
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
          <TouchableOpacity
            onPress={onShowEditDate}
            style={styles.headerEditDateBtn}>
            <FontAwesome name="calendar" size={18} />
          </TouchableOpacity>
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
            style={styles.checkbox}
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
            multiline
          />
        </View>
        <TextInput
          style={styles.taskDescription}
          value={task.description}
          onChangeText={onUpdateTaskDescription}
          multiline
          textAlignVertical="top"
        />
      </View>
      <DateTimePickerModal
        isVisible={showEditDate?.show}
        mode="date"
        onConfirm={date => {
          setShowEditDate(preVal => {
            return {...preVal, show: false};
          });
          handleEditDate(showEditDate!.task?.id!, date.toISOString());
        }}
        onCancel={() => {
          setShowEditDate(undefined);
        }}
        date={moment(showEditDate?.task?.date).toDate()}
      />
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
    alignItems: 'center',
  },
  headerDeleteBtn: {
    marginLeft: 25,
  },
  headerEditDateBtn: {
    marginRight: 25,
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
    textDecorationLine: 'none',
    marginRight: 30,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    minHeight: 300,
  },
  checkbox: {
    marginTop: 10,
  },
});
