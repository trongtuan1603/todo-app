import {create} from 'zustand';
import EncryptedStorage from 'react-native-encrypted-storage';

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
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

const saveTasksToStorage = async (tasks: Task[]) => {
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
