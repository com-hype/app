import React from 'react';
import {Text, StyleSheet} from 'react-native';
export function Title({children, style, ...props}) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
