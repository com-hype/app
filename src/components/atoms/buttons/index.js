import React from 'react';

import {TouchableOpacity, Text} from 'react-native';

import styles from './buttons.style';

export function Button({
  children,
  onPress,
  style,
  textStyle,
  isDisabled,
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

  const getSizeStyleText = size => {
    switch (size) {
      case 'small':
        return styles.textsmall;
      case 'medium':
        return styles.textmedium;
      case 'large':
        return styles.textlarge;
      default:
        return styles.textmedium;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, getSizeStyle(size), style]}
      {...props}>
      <Text style={[styles.text, getSizeStyleText(size), textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
