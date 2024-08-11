import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ITask} from '../utils/types';

export type TaskActionSheetRef = {
  open: (task: ITask) => void;
  close: () => void;
};

export type TaskActionSheetProps = {
  onRemoveTask: (id: string) => void;
  onEditDate: (task: ITask) => void;
  onSetReminder: (id: string) => void;
};

const TaskActionSheet = forwardRef<TaskActionSheetRef, TaskActionSheetProps>(
  ({onRemoveTask, onEditDate, onSetReminder}, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [task, setTask] = useState<ITask | undefined>();

    useImperativeHandle(
      ref,
      () => ({
        open: task => {
          setOpen(true);
          setTask(task);
        },
        close: () => {
          setOpen(false);
          setTask(undefined);
        },
      }),
      [],
    );

    const ActionRow = ({
      iconName,
      title,
      onPress,
    }: {
      iconName: string;
      title: string;
      onPress: () => void;
    }) => {
      const onActionPress = () => {
        setOpen(false);
        setTimeout(() => {
          onPress();
        }, 200);
      };

      return (
        <TouchableOpacity onPress={onActionPress} style={styles.actionRow}>
          <FontAwesome6 name={iconName} />
          <Text style={styles.actionText}>{title}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal
        isVisible={open}
        useNativeDriver
        style={styles.modal}
        onBackdropPress={() => setOpen(false)}>
        <View style={styles.container}>
          <View style={styles.swipeBar} />
          <ActionRow
            iconName={'trash-can'}
            title={'Remove this task'}
            onPress={() => onRemoveTask(task?.id!)}
          />
          <ActionRow
            iconName="calendar-days"
            title={'Edit date'}
            onPress={() => onEditDate(task!)}
          />
          <ActionRow iconName="clock" title={'Reminder'} onPress={() => {}} />
        </View>
      </Modal>
    );
  },
);

export default TaskActionSheet;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  actionText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: Colors.black,
    marginLeft: 10,
  },
  swipeBar: {
    width: 40,
    height: 4,
    borderRadius: 10,
    backgroundColor: Colors.gray,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
