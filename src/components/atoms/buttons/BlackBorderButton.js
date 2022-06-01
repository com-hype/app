import React from 'react';

import {Text} from 'react-native';
import {Button} from '.';

import styles from './buttons.style';

export function BlackBorderButton({
  children,
  onPress,
  style,
  textStyle,
  ...props
}) {
  return (
    <Button
      onPress={onPress}
      style={[styles.containerBorder, style]}
      textStyle={[styles.textBorder, textStyle]}
      {...props}>
      {children}
    </Button>
  );
}
