import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

export type TaskActionSheetRef = {
  open: (id: string) => void;
  close: () => void;
};

const TaskActionSheet = forwardRef<TaskActionSheetRef>((props, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string | undefined>();

  useImperativeHandle(
    ref,
    () => ({
      open: id => {
        setOpen(true);
        setTaskId(id);
      },
      close: () => {
        setOpen(false);
        setTaskId(undefined);
      },
    }),
    [],
  );

  return (
    <Modal
      isVisible={open}
      useNativeDriver
      style={styles.modal}
      onBackdropPress={() => setOpen(false)}>
      <View style={styles.container}></View>
    </Modal>
  );
});

export default TaskActionSheet;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    height: 300,
    backgroundColor: 'white',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
});
