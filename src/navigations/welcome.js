import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingScreen from '../features/welcome/onboarding/onboarding.screen';
import UserTypeScreen from '../features/welcome/user-type/user-type.screen';
import UserHobbiesScreen from '../features/welcome/hobbies/hobbies.screen';

const Stack = createNativeStackNavigator();

const WelcomeNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={OnboardingScreen} />
        <Stack.Screen name="UserType" component={UserTypeScreen} />
        <Stack.Screen name="UserHobbies" component={UserHobbiesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WelcomeNavigation;
