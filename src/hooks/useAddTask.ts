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
    addTask({
      id: Date.now().toString(),
      title: title,
      description: description,
    });
    props.onCloseModal();
  };

  const onBackdropPress = () => {
    Keyboard.dismiss();
    props.onCloseModal();
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
  };
};

export default useAddTask;
