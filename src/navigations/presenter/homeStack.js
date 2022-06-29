import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProjectsScreen from '../../features/discoverer/projects.screen';
import ProjectDetailsScreen from '../../features/discoverer/project-details/project-details.screen';
import ProjectCrowfundingScreen from '../../features/discoverer/project-crowdfunding/project-crowdfunding.screen';
import ProjectStatsScreen from '../../features/presenter/project-stats/project-stats.screen';
import ProjectImagesScreen from '../../features/discoverer/project-images/project-images.screen';
import MessagesScreen from '../../features/chat/messages/messages.screen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {HideTabBar} from '../../core/app.context';

const Stack = createNativeStackNavigator();

const HomeStack = ({navigation, route}) => {
  const {setStatus} = useContext(HideTabBar);
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'ProjectImages' || routeName === 'DiscussionMessages') {
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
      {/* <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      <Stack.Screen
        name="ProjectCrowfunding"
        component={ProjectCrowfundingScreen}
      />
      <Stack.Screen name="ProjectImages" component={ProjectImagesScreen} />
      <Stack.Screen name="ProjectStats" component={ProjectStatsScreen} /> */}
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
