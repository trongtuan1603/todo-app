import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useEffect, useRef, useState} from 'react';
import {TaskActionSheetRef} from '../components/TaskActionSheet';
import useTaskStore from '../store/taskStore';
import {RouteName} from '../utils/constants';
import {AppStackParamsList, EditDateState, ITask} from '../utils/types';

interface TaskListHookProps {
  date?: Date;
}

const useTaskList = ({date}: TaskListHookProps) => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamsList>>();
  const dateStr = date?.toISOString();

  const {
    getTasks,
    removeTask,
    updateTaskStatus,
    updateTasksList,
    updateImportant,
    updateTaskDate,
  } = useTaskStore();

  const incompleteTasks = useTaskStore(state =>
    state.getIncompleteTasks(dateStr),
  );
  const completedTasks = useTaskStore(state =>
    state.getCompletedTasks(dateStr),
  );
  const overdueTasks = useTaskStore(state => state.getOverdueTasks());

  const taskActionSheetRef = useRef<TaskActionSheetRef>(null);

  const [showEditDate, setShowEditDate] = useState<EditDateState>();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleRemoveTask = (taskId: string) => {
    removeTask(taskId);
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

  const handleTaskOptionsPress = (task: ITask) => {
    taskActionSheetRef.current?.open(task);
  };

  const handleUpdateTaskImportant = (task: ITask) => {
    updateImportant(task!.id, !task?.important);
  };

  const onShowEditDate = (task: ITask) => {
    setShowEditDate({
      show: true,
      task,
    });
  };

  const handleEditDate = (taskId: string, date: string) => {
    updateTaskDate(taskId, date);
  };

  return {
    incompleteTasks,
    completedTasks,
    overdueTasks,
    taskActionSheetRef,
    showEditDate,
    setShowEditDate,
    handleRemoveTask,
    handleReorderTask,
    handleToggleStatus,
    handleTaskPress,
    handleTaskOptionsPress,
    handleUpdateTaskImportant,
    handleEditDate,
    onShowEditDate,
  };
};

export default useTaskList;
