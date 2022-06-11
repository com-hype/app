import React from 'react';

import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  View,
  Text,
} from 'react-native';
import {BlackButton, Paragraph, Title} from '../../../../components/atoms';
import StepIndicator from './stepIndicator';
import * as Animatable from 'react-native-animatable';

const {height} = Dimensions.get('window');

export default function OnboardingStep({
  step = {},
  currentStep = 0,
  maxStep = 4,
  onNext = () => {},
}) {
  return (
    <Animatable.View
      animation="slideInRight"
      easing="ease-in"
      duration={200}
      useNativeDriver={true}>
      <ImageBackground source={step.image} style={styles.image}>
        <StepIndicator currentStep={currentStep} totalSteps={maxStep} />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>COMHYPE</Text>
        <Title style={styles.title}>{step.title}</Title>
        <Paragraph style={styles.description}>{step.description}</Paragraph>
        <BlackButton
          size="large"
          style={styles.btn}
          textStyle={styles.btnText}
          onPress={() => onNext()}>
          Suivant
        </BlackButton>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: height / 1.5,
    borderBottomLeftRadius: 80,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  textContainer: {
    marginVertical: 30,
    marginHorizontal: 30,
  },
  title: {
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 11,
    color: '#A3A9AF',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  description: {
    color: '#767676',
    marginBottom: 30,
  },
  btn: {
    paddingVertical: 15,
  },
  btnText: {
    fontSize: 14,
  },
});
