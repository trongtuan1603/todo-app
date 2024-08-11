import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Dimensions, Text, View} from 'react-native';
import TaskList from '../components/TaskList';
import useAllTasks from '../hooks/useAllTasks';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const AllScreen = () => {
  const {
    date,
    handleSelectDate,
    showDatePicker,
    handleShowDatePicker,
    handleHideDatePicker,
    handleNextDate,
    handlePrevDate,
  } = useAllTasks();

  const dateStr = date.isSame(moment(), 'date')
    ? 'Today'
    : date.format('DD-MM-YYYY');

  return (
    <View style={{flex: 1}}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>All Tasks</Text>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={handleShowDatePicker}>
          <Ionicons name="calendar" size={15} />
        </TouchableOpacity>
      </View>
      <View style={styles.dateHeader}>
        <TouchableOpacity onPress={handlePrevDate}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>
        <Text style={styles.dateText}>{dateStr}</Text>
        <TouchableOpacity onPress={handleNextDate}>
          <FontAwesome name="angle-right" size={35} />
        </TouchableOpacity>
      </View>
      <TaskList date={date.toDate()} />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleSelectDate}
        onCancel={handleHideDatePicker}
        date={date.toDate()}
      />
    </View>
  );
};

export default AllScreen;

const styles = StyleSheet.create({
  screenHeader: {
    backgroundColor: Colors.white,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  calendarButton: {
    padding: 20,
  },
  screenTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.black,
  },
  dateHeader: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  dateText: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.black,
  },
});
