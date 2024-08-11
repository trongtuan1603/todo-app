export type BottomTabParamsList = {
  BottomTab: undefined;
};

export type AppStackParamsList = {
  Root: undefined;
  TaskDetail: {
    taskId: string;
  };
};

export type ITask = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  important?: boolean;
  date: string;
};

export interface EditDateState {
  show: boolean;
  task?: ITask;
}
