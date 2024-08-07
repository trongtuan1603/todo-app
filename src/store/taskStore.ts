import {create} from 'zustand';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ITask} from '../utils/types';

interface TaskStore {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  removeTask: (id: string) => void;
  updateTaskStatus: (id: string) => void;
  getTasks: () => void;
  updateTasksList: (task: ITask[]) => void;
  getIncompleteTasks: () => ITask[];
  getCompletedTasks: () => ITask[];
}

const useTaskStore = create<TaskStore>((set, get) => ({
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

  updateTaskStatus: async (id: string) => {
    set(state => {
      const completeIndex = state.tasks.findIndex(task => task.id === id);
      const updatedTasks = [...state.tasks];

      if (completeIndex > -1) {
        updatedTasks[completeIndex].isCompleted =
          !updatedTasks[completeIndex].isCompleted;
        updatedTasks.push(updatedTasks.splice(completeIndex, 1)[0]);
      }

      saveTasksToStorage(updatedTasks);
      return {tasks: updatedTasks};
    });
  },

  updateTasksList: async (updatedTasks: ITask[]) => {
    set(state => {
      saveTasksToStorage(updatedTasks);
      return {tasks: updatedTasks};
    });
  },

  getIncompleteTasks: () => get().tasks.filter(task => !task.isCompleted),
  getCompletedTasks: () => get().tasks.filter(task => task.isCompleted),
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
