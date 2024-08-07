import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
  RenderItemParams,
  RenderPlaceholder,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import AddTaskView from '../components/AddTaskModal';
import TaskItem from '../components/TaskItem';
import useHome from '../hooks/useHome';
import Colors from '../styles/colors';
import {ITask} from '../utils/types';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import {FadeOut} from 'react-native-reanimated';

const HomeScreen = gestureHandlerRootHOC(() => {
  const {
    incompleteTasks,
    completedTasks,
    handleRemoveTask,
    handleReorderTask,
    handleToggleStatus,
  } = useHome();
  const renderIncompleteItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<ITask>) => {
    return (
      <TaskItem
        isDragging={isActive}
        data={item}
        onToggleStatus={handleToggleStatus}
        onRemoveTask={handleRemoveTask}
        onLongPress={drag}
      />
    );
  };

  const keyExtractor = (item: ITask, index: number) => {
    return item.id.toString();
  };

  const renderCompletedItem = ({item, index}: {item: ITask; index: number}) => {
    return (
      <TaskItem
        data={item}
        onToggleStatus={handleToggleStatus}
        onRemoveTask={handleRemoveTask}
      />
    );
  };

  const renderPlaceholder: RenderPlaceholder<ITask> = (params: {
    item: ITask;
    index: number;
  }) => {
    return <View style={styles.reorderPlaceholder}></View>;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.listCompletedContainer}>
        <Text style={styles.listHeader}>To-do</Text>
        <NestableScrollContainer>
          <NestableDraggableFlatList
            data={incompleteTasks}
            renderItem={renderIncompleteItem}
            keyExtractor={keyExtractor}
            onDragEnd={({data}) => handleReorderTask(data)}
            renderPlaceholder={renderPlaceholder}
          />
        </NestableScrollContainer>
      </View>
      {completedTasks.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listHeader}>Completed</Text>
          <FlatList data={completedTasks} renderItem={renderCompletedItem} />
        </View>
      )}
    </GestureHandlerRootView>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grayBackground,
  },
  listCompletedContainer: {
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
});
