import React from 'react';
import {Text, StyleSheet} from 'react-native';
export function DescriptionLabel({children, style}) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    color: '#909090',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 10,
  },
});
