import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AppStackParamsList, EditDateState, ITask} from '../utils/types';
import {StackNavigationProp} from '@react-navigation/stack';
import useTaskStore from '../store/taskStore';
import {useState} from 'react';

const useTaskDetail = () => {
  const route = useRoute<RouteProp<AppStackParamsList, 'TaskDetail'>>();
  const navigation = useNavigation<StackNavigationProp<AppStackParamsList>>();
  const taskId = route.params.taskId;

  const {
    removeTask,
    updateTaskStatus,
    updateTask,
    updateImportant,
    updateTaskDate,
  } = useTaskStore();

  const task = useTaskStore(state => state.getTask(taskId));

  const [showEditDate, setShowEditDate] = useState<EditDateState>();

  const onGoBack = () => {
    navigation.goBack();
  };

  const handleToggleStatus = (task: ITask) => {
    updateTaskStatus(task.id);
  };

  const onUpdateTaskDescription = (description: string) => {
    updateTask({...task!, description});
  };

  const onUpdateTaskTitle = (title: string) => {
    updateTask({...task!, title});
  };

  const handleRemoveTask = () => {
    removeTask(task!.id);
    navigation.goBack();
  };

  const handleUpdateTaskImportant = () => {
    updateImportant(task!.id, !task?.important);
  };

  const onShowEditDate = () => {
    setShowEditDate({
      show: true,
      task,
    });
  };

  const handleEditDate = (taskId: string, date: string) => {
    updateTaskDate(taskId, date);
  };

  return {
    task,
    showEditDate,
    onShowEditDate,
    onGoBack,
    handleToggleStatus,
    onUpdateTaskTitle,
    onUpdateTaskDescription,
    handleRemoveTask,
    handleUpdateTaskImportant,
    handleEditDate,
    setShowEditDate,
  };
};

export default useTaskDetail;
