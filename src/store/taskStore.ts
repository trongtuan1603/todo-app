import {create} from 'zustand';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ITask} from '../utils/types';

interface TaskStore {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  removeTask: (id: string) => void;
  getTasks: () => void;
}

const useTaskStore = create<TaskStore>(set => ({
  tasks: [],
  addTask: async task => {
    set(state => {
      const updatedTasks = [...state.tasks, task];
      saveTasksToStorage(updatedTasks);
      return {tasks: updatedTasks};
    });
  },
  removeTask: async id => {
    set(state => {
      const updatedTasks = state.tasks.filter(task => task.id !== id);
      saveTasksToStorage(updatedTasks);
      return {tasks: updatedTasks};
    });
  },
  getTasks: async () => {
    const tasks = await getTasksFromStorage();
    set({tasks: tasks || []});
  },
}));

const saveTasksToStorage = async (tasks: ITask[]) => {
  try {
    await EncryptedStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};

const getTasksFromStorage = async () => {
  try {
    const tasks = await EncryptedStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
};

export default useTaskStore;
