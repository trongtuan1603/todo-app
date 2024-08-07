import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AllScreen from '../screens/AllScreen';
import HomeScreen from '../screens/HomeScreen';
import Colors from '../styles/colors';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/src/types';
import {RouteName} from '../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AddTaskModal from '../components/AddTaskModal';

type CustomTabBarProps = {
  onAddTaskPress: () => void;
};

const Tab = createBottomTabNavigator();

const AddTaskScreenComponent = () => {
  return null;
};

const BottomTabNavigator = () => {
  const [showAddTaskModal, setShowAddTaskModal] = React.useState(false);

  const onCloseModal = () => {
    setShowAddTaskModal(false);
  };

  const onShowModal = () => {
    setShowAddTaskModal(true);
  };

  return (
    <>
      <Tab.Navigator
        tabBar={props => (
          <CustomTabBar {...props} onAddTaskPress={onShowModal} />
        )}
        screenOptions={{
          headerTitleStyle: {
            color: Colors.black,
            elevation: 5,
            fontSize: 16,
          },
        }}>
        <Tab.Screen name={RouteName.Today} component={HomeScreen} />
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name={RouteName.AddTask}
          component={AddTaskScreenComponent}
        />
        <Tab.Screen name={RouteName.All} component={AllScreen} />
      </Tab.Navigator>
      <AddTaskModal isVisible={showAddTaskModal} onCloseModal={onCloseModal} />
    </>
  );
};

const CustomTabBar: React.FC<BottomTabBarProps & CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  onAddTaskPress,
}) => {
  return (
    <View style={styles.bottomTab}>
      {state.routes.map((route, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (route.name === RouteName.AddTask) {
            event?.preventDefault();
            onAddTaskPress();
          }

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index.toString()}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            {index == 1 ? (
              <View style={styles.addTaskButton}>
                <FontAwesome6 name="plus" size={16} color={Colors.primary} />
              </View>
            ) : (
              <View style={styles.tabButton}>
                <TabIcon routeName={route.name} focused={isFocused} />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabIcon = ({
  routeName,
  focused,
}: {
  routeName: string;
  focused: boolean;
}) => {
  switch (routeName) {
    case RouteName.Today:
      return (
        <View style={styles.tabIconContainer}>
          <Ionicons
            name={focused ? 'calendar-clear' : 'calendar-clear-outline'}
            size={23}
            color={focused ? Colors.primary : Colors.black}
          />
          <Text
            style={[
              styles.bottomBarDateText,
              {color: focused ? Colors.white : Colors.black},
            ]}>
            {new Date().getDate()}
          </Text>
        </View>
      );

    case RouteName.All:
      return (
        <Ionicons
          name={focused ? 'calendar' : 'calendar-outline'}
          size={23}
          color={focused ? Colors.primary : Colors.black}
        />
      );

    default:
      return <></>;
  }
};
const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: Colors.black,
    elevation: 12,
  },
  addTaskButton: {
    height: 35,
    width: 35,
    alignItems: 'center',
    backgroundColor: Colors.primary8,
    justifyContent: 'center',
    borderRadius: 18,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBarDateText: {
    top: 8,
    fontSize: 9,
    position: 'absolute',
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;
