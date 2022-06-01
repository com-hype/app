import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProjectsScreen from '../features/discoverer/projects.screen';

const Stack = createNativeStackNavigator();

const DefaultNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={ProjectsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default DefaultNavigation;
