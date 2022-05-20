import React from 'react';

import {Text} from 'react-native';
import {Button} from '.';

import styles from './buttons.style';

export function BlackButton({children, onPress, style, ...props}) {
  return (
    <Button
      onPress={onPress}
      style={[styles.containerSolid, style]}
      textStyle={[styles.textSolid, style]}
      {...props}>
      {children}
    </Button>
  );
}
