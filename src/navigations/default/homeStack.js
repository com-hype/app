import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProjectsScreen from '../../features/discoverer/projects.screen';
import ProjectDetailsScreen from '../../features/discoverer/project-details/project-details.screen';
import ProjectCrowfundingScreen from '../../features/discoverer/project-crowdfunding/project-crowdfunding.screen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={ProjectsScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
        <Stack.Screen
          name="ProjectCrowfunding"
          component={ProjectCrowfundingScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
