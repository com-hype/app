import React, {useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import steps from './onboarding.utils';
import OnboardingStep from './_components/onboardingStep';
const {height} = Dimensions.get('window');

export default function OnboardingScreen() {
  const {navigate} = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('UserType');
    }
  };

  return (
    <View
      animation="slideInRight"
      easing="ease-in"
      duration={200}
      useNativeDriver={true}>
      <OnboardingStep
        step={steps[currentStep]}
        currentStep={currentStep}
        maxStep={steps.length}
        onNext={handleNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
