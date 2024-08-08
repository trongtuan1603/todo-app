import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AppStackParamsList, ITask} from '../utils/types';
import {StackNavigationProp} from '@react-navigation/stack';
import useTaskStore from '../store/taskStore';

const useTaskDetail = () => {
  const route = useRoute<RouteProp<AppStackParamsList, 'TaskDetail'>>();
  const navigation = useNavigation<StackNavigationProp<AppStackParamsList>>();
  const taskId = route.params.taskId;

  const {removeTask, updateTaskStatus, updateTask, updateImportant} =
    useTaskStore();

  const task = useTaskStore(state => state.getTask(taskId));

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

  return {
    task,
    onGoBack,
    handleToggleStatus,
    onUpdateTaskTitle,
    onUpdateTaskDescription,
    handleRemoveTask,
    handleUpdateTaskImportant,
  };
};

export default useTaskDetail;
