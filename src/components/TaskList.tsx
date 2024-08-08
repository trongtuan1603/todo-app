import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
  RenderItemParams,
  RenderPlaceholder,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import TaskItem from '../components/TaskItem';
import useTaskList from '../hooks/useTaskList';
import Colors from '../styles/colors';
import {ITask} from '../utils/types';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import TaskActionSheet from '../components/TaskActionSheet';

type TaskListProps = {
  date?: Date;
};

const TaskList = ({date}: TaskListProps) => {
  const {
    incompleteTasks,
    completedTasks,
    taskActionSheetRef,
    handleRemoveTask,
    handleReorderTask,
    handleToggleStatus,
    handleTaskPress,
    handleTaskOptionsPress,
    handleUpdateTaskImportant,
  } = useTaskList();

  const renderIncompleteItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<ITask>) => {
    return (
      <TaskItem
        onPress={handleTaskPress}
        isDragging={isActive}
        data={item}
        onToggleStatus={handleToggleStatus}
        onRemoveTask={handleRemoveTask}
        onLongPress={drag}
        onOptionsPress={handleTaskOptionsPress}
        onUpdateTaskImportant={handleUpdateTaskImportant}
      />
    );
  };

  const keyExtractor = (item: ITask, index: number) => {
    return item.id.toString();
  };

  const renderCompletedItem = ({item, index}: {item: ITask; index: number}) => {
    return (
      <TaskItem
        onPress={handleTaskPress}
        data={item}
        onToggleStatus={handleToggleStatus}
        onRemoveTask={handleRemoveTask}
        onOptionsPress={handleTaskOptionsPress}
        onUpdateTaskImportant={handleUpdateTaskImportant}
      />
    );
  };

  const renderPlaceholder: RenderPlaceholder<ITask> = (params: {
    item: ITask;
    index: number;
  }) => {
    return <View style={styles.reorderPlaceholder}></View>;
  };

  const IncompleteEmptyComponent = () => {
    return (
      <View style={styles.emptyIncompleteContainer}>
        <Text style={styles.noTasks}>No tasks left</Text>
        <Text style={styles.noTasksDesc}>
          {
            'You’ve completed everything.\nStart a new task to keep the momentum going!'
          }
        </Text>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.listInCompleteContainer}>
        <NestableScrollContainer>
          <NestableDraggableFlatList
            data={incompleteTasks}
            renderItem={renderIncompleteItem}
            keyExtractor={keyExtractor}
            onDragEnd={({data}) => handleReorderTask(data)}
            renderPlaceholder={renderPlaceholder}
            ListEmptyComponent={<IncompleteEmptyComponent />}
          />
        </NestableScrollContainer>
      </View>
      {completedTasks.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listHeader}>Completed</Text>
          <FlatList data={completedTasks} renderItem={renderCompletedItem} />
        </View>
      )}
      <TaskActionSheet ref={taskActionSheetRef} />
    </GestureHandlerRootView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueWhiteBg,
  },
  listInCompleteContainer: {
    padding: 14,
    shadowColor: Colors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: Colors.white,
    marginBottom: 10,
  },
  listContainer: {
    padding: 14,
    shadowColor: Colors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: Colors.white,
  },
  listHeader: {
    fontSize: 14,
    color: Colors.grayText,
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  reorderPlaceholder: {
    height: 45,
    backgroundColor: Colors.primary7,
    borderRadius: 5,
  },
  emptyIncompleteContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noTasks: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    color: Colors.black,
    marginBottom: 5,
  },
  noTasksDesc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.black,
    textAlign: 'center',
  },
});
