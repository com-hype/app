import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProjectScreen from '../../features/project/project.screen';
import AccountScreen from '../../features/account/account.screen';

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
        <Stack.Screen name="Paramètres du projet" component={ProjectScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AccountStack;
