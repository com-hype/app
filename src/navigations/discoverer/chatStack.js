import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../../features/chat/chat/chat.screen';
import MessagesScreen from '../../features/chat/messages/messages.screen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {HideTabBar} from '../../core/app.context';

const Stack = createNativeStackNavigator();
const ChatStack = ({navigation, route}) => {
  const {setStatus} = useContext(HideTabBar);
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'DiscussionMessages') {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={ChatScreen} />
      <Stack.Screen name="DiscussionMessages" component={MessagesScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
