import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProjectSettingsScreen from '../../features/project/project-setting/project-settings.screen';
import AccountScreen from '../../features/account/account.screen';
import ProjectFeaturesScreen from '../../features/project/project-features/project-features.screen';

const Stack = createNativeStackNavigator();
const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Mon Compte" component={AccountScreen} />
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
