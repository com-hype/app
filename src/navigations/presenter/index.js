import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Pusher from 'pusher-js/react-native';
import Toast from 'react-native-toast-message';

import HomeStack from './homeStack';
import ChatStack from './chatStack';
import AccountStack from './accountStack';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/authentication/user.redux';
import ListStack from '../discoverer/listStack';

const Tab = createBottomTabNavigator();
let pusher = new Pusher('76af20e9e12a3ba167d2', {
  cluster: 'eu',
});

const PresenterNavigation = () => {
  const user = useSelector(selectUser);
  let channel = pusher.subscribe(`user.${user.id}`);

  useEffect(() => {
    channel.bind('user.receive.message', function (data) {
      Toast.show({
        type: 'info',
        text1: data.title,
        text2: data.message.body,
      });
    });
  }, []);

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

export default PresenterNavigation;
