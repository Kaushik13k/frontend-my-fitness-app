import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faUser, faDumbbell} from '@fortawesome/free-solid-svg-icons';

import HomeScreen from './HomeScreen/HomeScreen';
import AboutScreen from './AboutScreen/AboutScreen';
import WorkoutScreen from './WorkoutScreen/WorkoutScreen';

const Tab = createBottomTabNavigator();

interface Props {
  userData: any; // Define the type of userData prop
}

const iconMap = {
  Home: faHome,
  About: faUser,
  Workouts: faDumbbell,
  // Settings: faCog,
};

const iconStyle = {
  highLightColor: '#ffcc02',
  iconColor: 'white',
  backgroundColor: 'black',
};

const BottomTabNavigator: React.FC<Props> = ({userData}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const iconName = iconMap[route.name];
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: iconStyle.highLightColor,
        tabBarStyle: {
          backgroundColor: iconStyle.backgroundColor,
          borderTopWidth: 5,
          borderTopColor: '#ffcc02',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{userData: userData}}
      />
      <Tab.Screen name="Workouts" component={WorkoutScreen} />
      <Tab.Screen
        name="About"
        options={{headerShown: false}}
        component={AboutScreen}
        initialParams={{userData: userData}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
