import {useEffect} from 'react';
import useTaskStore from '../store/taskStore';
import {ITask} from '../utils/types';

const useHome = () => {
  const {tasks, getTasks, removeTask} = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleRemoveTask = (task: ITask) => {
    removeTask(task.id);
  };

  return {
    tasks,
    handleRemoveTask,
  };
};

export default useHome;
