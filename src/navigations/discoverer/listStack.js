import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProjectsScreen from '../../features/discoverer/projects.screen';
import LikesListScreen from '../../features/likes/likes.screen';
import ProjectDetailsScreen from '../../features/discoverer/project-details/project-details.screen';

const Stack = createNativeStackNavigator();
const ListStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={LikesListScreen} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
    </Stack.Navigator>
  );
};

export default ListStack;
