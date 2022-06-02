import React from 'react';

import {Input} from '.';
export function InputLine({
  style = {},
  onChangeText = () => {},
  value = '',
  placeholder = '',
  secureTextEntry = false,
  ...props
}) {
  return (
    <Input
      style={[styles.container, style]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
}
