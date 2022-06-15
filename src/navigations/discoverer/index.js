import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import HomeStack from './homeStack';
import ChatStack from './chatStack';
import AccountStack from './accountStack';
import ListStack from './listStack';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/authentication/user.redux';

const Tab = createBottomTabNavigator();

const DiscovererNavigation = () => {
  const user = useSelector(selectUser);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarVisibilityAnimationConfig: {
            visible: true,
            animation: 'fadeIn',
          },
          tabBarIcon: ({focused}) => {
            let iconName;
            let size = 24;

            let color = focused ? '#5F5BD9' : '#BEBEBE';
            if (route.name === 'Accueil') {
              iconName = focused ? 'brain' : 'brain';
            } else if (route.name === 'Messages') {
              iconName = focused ? 'comments' : 'comments';
            } else if (route.name === 'Compte') {
              iconName = focused ? 'user' : 'user';
            } else if (route.name === 'Liste') {
              iconName = focused ? 'bookmark' : 'bookmark';
            }

            return (
              <FontAwesome name={iconName} size={size} color={color} solid />
            );
          },
          showLabel: false,
          headerShown: false,
        })}>
        <Tab.Screen name="Accueil" component={HomeStack} />
        <Tab.Screen name="Liste" component={ListStack} />
        <Tab.Screen name="Messages" component={ChatStack} />
        <Tab.Screen name="Compte" component={AccountStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default DiscovererNavigation;
