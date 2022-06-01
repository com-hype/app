import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import steps from './onboarding.utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BlackBorderButton, BlackButton, Title} from '../../../components/atoms';
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
    <View>
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
