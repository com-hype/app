import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../../features/chat/chat/chat.screen';
import MessagesScreen from '../../features/chat/messages/messages.screen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const ChatStack = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'DiscussionMessages') {
      navigation.setOptions({
        tabBarStyle: {display: 'none'},
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {display: 'flex'},
      });
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
