import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useEffect, useRef} from 'react';
import {TaskActionSheetRef} from '../components/TaskActionSheet';
import useTaskStore from '../store/taskStore';
import {RouteName} from '../utils/constants';
import {AppStackParamsList, ITask} from '../utils/types';

const useHome = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamsList>>();

  const {
    getTasks,
    removeTask,
    updateTaskStatus,
    updateTasksList,
    updateImportant,
  } = useTaskStore();
  const incompleteTasks = useTaskStore(state => state.getIncompleteTasks());
  const completedTasks = useTaskStore(state => state.getCompletedTasks());

  const taskActionSheetRef = useRef<TaskActionSheetRef>(null);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleRemoveTask = (task: ITask) => {
    removeTask(task.id);
  };

  const handleReorderTask = (updatedTasks: ITask[]) => {
    updateTasksList([...updatedTasks, ...completedTasks]);
  };

  const handleToggleStatus = (task: ITask) => {
    updateTaskStatus(task.id);
  };

  const handleTaskPress = (task: ITask) => {
    navigation.navigate('TaskDetail', {
      taskId: task.id,
    });
  };

  const handleTaskOptionsPress = (id: string) => {
    taskActionSheetRef.current?.open(id);
  };

  const handleUpdateTaskImportant = (task: ITask) => {
    updateImportant(task!.id, !task?.important);
  };

  return {
    incompleteTasks,
    completedTasks,
    taskActionSheetRef,
    handleRemoveTask,
    handleReorderTask,
    handleToggleStatus,
    handleTaskPress,
    handleTaskOptionsPress,
    handleUpdateTaskImportant,
  };
};

export default useHome;
