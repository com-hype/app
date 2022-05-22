import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingScreen from '../features/welcome/onboarding/onboarding.screen';

const Stack = createNativeStackNavigator();

const WelcomeNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={OnboardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WelcomeNavigation;
