import React from 'react';

import {TouchableOpacity, Text} from 'react-native';

import styles from './buttons.style';

export function Button({
  children,
  onPress,
  style,
  textStyle,
  size = 'medium',
  ...props
}) {
  const getSizeStyle = size => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'medium':
        return styles.medium;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, getSizeStyle(size), style]}
      {...props}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}
