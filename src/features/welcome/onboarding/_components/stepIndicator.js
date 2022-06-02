import React from 'react';

import {View, StyleSheet} from 'react-native';
export default function StepIndicator({currentStep = 0, totalSteps = 4}) {
  return (
    <View style={styles.container}>
      {Array(totalSteps)
        .fill(0)
        .map((_, index) => {
          const isActive = index === currentStep;
          return (
            <View
              key={index}
              style={[styles.step, isActive && styles.activeStep]}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 10,
  },
  step: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ECF1F7',
    opacity: 0.3,
    marginHorizontal: 5,
  },
  activeStep: {
    opacity: 1,
  },
});
