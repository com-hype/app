import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProjectsScreen from '../../features/discoverer/projects.screen';
import ProjectDetailsScreen from '../../features/discoverer/project-details/project-details.screen';
import ProjectCrowfundingScreen from '../../features/discoverer/project-crowdfunding/project-crowdfunding.screen';
import ProjectImagesScreen from '../../features/discoverer/project-images/project-images.screen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MessagesScreen from '../../features/chat/messages/messages.screen';

const Stack = createNativeStackNavigator();

const HomeStack = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'ProjectImages') {
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
      <Stack.Screen name="Home" component={ProjectsScreen} />

      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      <Stack.Screen
        name="ProjectCrowfunding"
        component={ProjectCrowfundingScreen}
      />
      <Stack.Screen name="ProjectImages" component={ProjectImagesScreen} />
      <Stack.Screen name="DiscussionMessages" component={MessagesScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
