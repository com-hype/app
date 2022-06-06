import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingScreen from '../features/welcome/onboarding/onboarding.screen';
import UserTypeScreen from '../features/welcome/user-type/user-type.screen';
import UserHobbiesScreen from '../features/welcome/hobbies/hobbies.screen';
import ProjectCategoriesScreen from '../features/welcome/presenter/categories/categories.screen';
import ProjectWishScreen from '../features/welcome/presenter/wish/wish.screen';
import ProjectNameScreen from '../features/welcome/presenter/name/name.screen';
import ProjectDescriptionScreen from '../features/welcome/presenter/desciprtion/description.screen';
import ProjectImagesScreen from '../features/welcome/presenter/images/images.screen';

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
        <Stack.Screen
          name="ProjectCategories"
          component={ProjectCategoriesScreen}
        />
        <Stack.Screen name="ProjectWish" component={ProjectWishScreen} />
        <Stack.Screen name="ProjectName" component={ProjectNameScreen} />
        <Stack.Screen
          name="ProjectDescription"
          component={ProjectDescriptionScreen}
        />
        <Stack.Screen name="ProjectImages" component={ProjectImagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WelcomeNavigation;
