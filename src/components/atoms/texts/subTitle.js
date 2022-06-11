import React from 'react';
import {Text, StyleSheet} from 'react-native';
export function SubTitle({children, style, ...props}) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginTop: 20,
  },
});
