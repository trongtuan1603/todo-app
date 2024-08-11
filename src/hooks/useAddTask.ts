import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, TextInput, TextInputProps} from 'react-native';
import useTaskStore from '../store/taskStore';

type AddTaskHookProps = {
  onCloseModal: () => void;
};

const useAddTask = (props: AddTaskHookProps) => {
  const titleInputRef = React.createRef<TextInput>();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const {addTask} = useTaskStore();

  useEffect(() => {
    setTimeout(() => titleInputRef.current?.focus(), 500);
  }, []);

  const onTitleChanged = (val: string) => {
    setTitle(val);
  };

  const onDescriptionChanged = (val: string) => {
    setDescription(val);
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    const newTask = {
      id: Date.now().toString(),
      title: title,
      description: description,
      isCompleted: false,
      date: new Date().toISOString(),
    };
    addTask(newTask);

    setTitle('');
    setDescription('');
    props.onCloseModal();
  };

  const onBackdropPress = () => {
    Keyboard.dismiss();
    props.onCloseModal();
  };

  const onModalShow = () => {
    titleInputRef.current?.focus();
  };

  return {
    title,
    description,
    setDescription,
    titleInputRef,
    onBackdropPress,
    onTitleChanged,
    onDescriptionChanged,
    onSubmit,
    onModalShow,
  };
};

export default useAddTask;
