import React, {useEffect} from 'react';

import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Pusher from 'pusher-js/react-native';
import Toast from 'react-native-toast-message';

import HomeStack from './homeStack';
import ChatStack from './chatStack';
import AccountStack from './accountStack';
import ListStack from './listStack';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/authentication/user.redux';
import TabBar from '../_components/tabbar';

const Tab = createBottomTabNavigator();
let pusher = new Pusher('76af20e9e12a3ba167d2', {
  cluster: 'eu',
});

const DiscovererNavigation = () => {
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
        tabBar={props => <TabBar {...props} />}
        screenOptions={{headerShown: false}}>
        <Tab.Screen name="Accueil" component={HomeStack} />
        <Tab.Screen name="Liste" component={ListStack} />
        <Tab.Screen name="Messages" component={ChatStack} />
        <Tab.Screen name="Compte" component={AccountStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default DiscovererNavigation;
