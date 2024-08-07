import {useEffect} from 'react';
import useTaskStore from '../store/taskStore';
import {ITask} from '../utils/types';

const useHome = () => {
  const {getTasks, removeTask, updateTaskStatus, updateTasksList} =
    useTaskStore();
  const incompleteTasks = useTaskStore(state => state.getIncompleteTasks());
  const completedTasks = useTaskStore(state => state.getCompletedTasks());

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

  return {
    incompleteTasks,
    completedTasks,
    handleRemoveTask,
    handleReorderTask,
    handleToggleStatus,
  };
};

export default useHome;
