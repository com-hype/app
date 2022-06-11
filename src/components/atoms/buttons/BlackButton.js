import React from 'react';

import {Text} from 'react-native';
import {Button} from '.';

import styles from './buttons.style';

export function BlackButton({
  children,
  onPress,
  style,
  textStyle,
  isDisabled,
  ...props
}) {
  return (
    <Button
      isDisabled={isDisabled}
      onPress={onPress}
      style={[styles.containerSolid, isDisabled && styles.disabled, style]}
      textStyle={[styles.textSolid, textStyle]}
      {...props}>
      {children}
    </Button>
  );
}
