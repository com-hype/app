import React from 'react';
import {Text, StyleSheet} from 'react-native';
export function Paragraph({children, style}) {
  return <Text style={[styles.paragraph, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  paragraph: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginVertical: 10,
    textAlign: 'center',
  },
});
