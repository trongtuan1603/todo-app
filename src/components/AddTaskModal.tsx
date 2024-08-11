import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import useAddTask from '../hooks/useAddTask';
import Colors from '../styles/colors';

interface AddTaskModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
}

const AddTaskModal = ({isVisible, onCloseModal}: AddTaskModalProps) => {
  const {
    title,
    description,
    onTitleChanged,
    onDescriptionChanged,
    onSubmit,
    onBackdropPress,
    titleInputRef,
    onModalShow,
  } = useAddTask({
    onCloseModal,
  });

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      useNativeDriver
      onModalShow={onModalShow}
      onBackdropPress={onBackdropPress}>
      <View style={styles.container}>
        <TextInput
          ref={titleInputRef}
          value={title}
          onChangeText={onTitleChanged}
          style={styles.titleTextInput}
          placeholder="What you want to do?"
          cursorColor={Colors.primary}
        />
        <TextInput
          value={description}
          onChangeText={onDescriptionChanged}
          style={styles.descriptionTextInput}
          placeholder="Description..."
          cursorColor={Colors.primary}
          multiline
        />
        <TouchableOpacity style={styles.createButton} onPress={onSubmit}>
          <Text style={styles.createTextButton}>Create</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddTaskModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    padding: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  titleTextInput: {
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionTextInput: {
    fontSize: 14,
    maxHeight: 300,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  createButton: {
    paddingVertical: 8,
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    paddingHorizontal: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  createTextButton: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.white,
  },
});
