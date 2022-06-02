import React from 'react';
import {Text, StyleSheet} from 'react-native';
export function ErrorLabel({children, style}) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    color: '#f00',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginVertical: 10,
    textAlign: 'center',
  },
});
