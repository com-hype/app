import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProjectsScreen from '../../features/discoverer/projects.screen';
import ChatScreen from '../../features/chat/chat.screen';

const Stack = createNativeStackNavigator();
const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
