import {create} from 'zustand';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ITask} from '../utils/types';
import moment from 'moment';

interface TaskStore {
  tasks: ITask[];
  addTask: (task: ITask, index?: number) => void;
  removeTask: (id: string) => void;
  updateTaskStatus: (id: string) => void;
  updateTaskDate: (id: string, date: string) => void;
  getTasks: () => void;
  updateTasksList: (task: ITask[]) => void;
  getIncompleteTasks: (date?: string) => ITask[];
  getCompletedTasks: (date?: string) => ITask[];
  getOverdueTasks: () => ITask[];
  getTask: (id: string) => ITask | undefined;
  updateTask: (task: ITask) => void;
  updateImportant: (id: string, isImportant: boolean) => void;
}

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  addTask: async (task, index) => {
    set(state => {
      const currentTasks = [...state.tasks];

      if (index) {
        currentTasks.splice(index, 0, task);
      } else {
        currentTasks.unshift(task);
      }
      saveTasksToStorage(currentTasks);
      return {tasks: currentTasks};
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

  updateTaskDate: async (id: string, date: string) => {
    set(state => {
      const updateIndex = state.tasks.findIndex(task => task.id === id);
      const updatedTasks = [...state.tasks];

      if (updateIndex > -1) {
        updatedTasks[updateIndex].date = date;
        updatedTasks.push(updatedTasks.splice(updateIndex, 1)[0]);
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

  updateTask: async (task: ITask) => {
    set(state => {
      const taskIndex = state.tasks.findIndex(t => t.id === task.id);
      const updateTasks = [...state.tasks];
      updateTasks[taskIndex] = task;
      saveTasksToStorage(updateTasks);
      return {tasks: updateTasks};
    });
  },

  updateImportant: async (id, isImportant) => {
    set(state => {
      const taskIndex = state.tasks.findIndex(t => t.id === id);
      const updateTasks = [...state.tasks];
      updateTasks[taskIndex].important = isImportant;
      saveTasksToStorage(updateTasks);
      return {tasks: updateTasks};
    });
  },

  getTask: id => get().tasks.find(task => task.id === id),
  getIncompleteTasks: (date?: string) =>
    get().tasks.filter(
      task =>
        !task.isCompleted && moment(task.date).isSame(moment(date), 'date'),
    ),
  getCompletedTasks: (date?: string) =>
    get().tasks.filter(
      task =>
        task.isCompleted && moment(task.date).isSame(moment(date), 'date'),
    ),

  getOverdueTasks: () =>
    get().tasks.filter(
      task => !task.isCompleted && moment(task.date).isBefore(moment(), 'date'),
    ),
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
