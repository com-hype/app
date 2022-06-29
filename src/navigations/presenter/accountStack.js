import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProjectSettingsScreen from '../../features/project/project-setting/project-settings.screen';
import AccountScreen from '../../features/account/account.screen';
import ProjectFeaturesScreen from '../../features/project/project-features/project-features.screen';
import ProjectImagesScreen from '../../features/discoverer/project-images/project-images.screen';
import ProjectStatsScreen from '../../features/presenter/project-stats/project-stats.screen';
import ProjectDetailsScreen from '../../features/discoverer/project-details/project-details.screen';
import {HideTabBar} from '../../core/app.context';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const AccountStack = ({navigation, route}) => {
  const {setStatus} = useContext(HideTabBar);
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'ProjectImages') {
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
      <Stack.Screen name="Mon Compte" component={AccountScreen} />
      <Stack.Screen name="MyProjectDetails" component={ProjectDetailsScreen} />
      <Stack.Screen name="ProjectImages" component={ProjectImagesScreen} />
      <Stack.Screen name="ProjectStats" component={ProjectStatsScreen} />
      <Stack.Group
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          name="Paramètres du projet"
          component={ProjectSettingsScreen}
        />
        <Stack.Screen
          name="Fonctionnalités du projet"
          component={ProjectFeaturesScreen}
          options={{
            headerTitle: 'Fonctionnalités',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AccountStack;
