import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
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
import Images from '../assets/images';
import {FadeInRight, FadeOutRight} from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

type TaskListProps = {
  date?: Date;
};

const TaskList = ({date}: TaskListProps) => {
  const {
    incompleteTasks,
    completedTasks,
    taskActionSheetRef,
    showEditDate,
    handleRemoveTask,
    handleReorderTask,
    handleToggleStatus,
    handleTaskPress,
    handleTaskOptionsPress,
    handleUpdateTaskImportant,
    setShowEditDate,
    onShowEditDate,
    handleEditDate,
  } = useTaskList({date});

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
      <View
        style={[
          styles.emptyIncompleteContainer,
          completedTasks.length == 0 && {flex: 1},
        ]}>
        <Image source={Images.noTasks} style={styles.emptyImg} />
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
      <NestableScrollContainer>
        <View style={styles.listInCompleteContainer}>
          <NestableDraggableFlatList
            data={incompleteTasks}
            renderItem={renderIncompleteItem}
            keyExtractor={keyExtractor}
            onDragEnd={({data}) => handleReorderTask(data)}
            renderPlaceholder={renderPlaceholder}
            ListEmptyComponent={<IncompleteEmptyComponent />}
          />
        </View>
        {completedTasks.length > 0 && (
          <View style={styles.listContainer}>
            <Text style={styles.listHeader}>Completed</Text>
            <FlatList
              data={completedTasks}
              scrollEnabled={false}
              renderItem={renderCompletedItem}
            />
          </View>
        )}
      </NestableScrollContainer>
      <TaskActionSheet
        ref={taskActionSheetRef}
        onRemoveTask={handleRemoveTask}
        onEditDate={onShowEditDate}
        onSetReminder={() => {}}
      />
      <DateTimePickerModal
        isVisible={showEditDate?.show}
        mode="date"
        onConfirm={date => {
          setShowEditDate(preVal => {
            return {...preVal, show: false};
          });
          handleEditDate(showEditDate!.task?.id!, date.toISOString());
        }}
        onCancel={() => {
          setShowEditDate(undefined);
        }}
        date={moment(showEditDate?.task?.date).toDate()}
      />
    </GestureHandlerRootView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listInCompleteContainer: {
    padding: 14,
    // shadowColor: Colors.black,
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.4,
    // shadowRadius: 2,
    // elevation: 2,
    backgroundColor: Colors.white,
    // marginBottom: 10,
    flex: 1,
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
    color: Colors.grayText,
    textAlign: 'center',
    lineHeight: 21,
  },
  emptyImg: {
    marginBottom: 10,
    height: 170,
    width: 170,
  },
});
