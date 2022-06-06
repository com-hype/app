import React from 'react';

import {Text, TouchableOpacity, Image, View} from 'react-native';

import styles from './buttons.style';

export function SelectButton({
  children,
  onPress,
  isChecked = true,
  style,
  textStyle,
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.large,
        styles.containerChecked,
        isChecked ? styles.containerSolid : styles.containerBorder,
        style,
      ]}
      {...props}>
      <Text
        style={[
          styles.textChecked,
          styles.textlarge,
          isChecked ? styles.textSolid : styles.textBorder,
          textStyle,
        ]}>
        {children}
      </Text>
      <View
        style={isChecked ? styles.emptyCheckedCircle : styles.checkedCircle}>
        {isChecked && (
          <Image source={require('../../../assets/img/icons/cross.png')} />
        )}
      </View>
    </TouchableOpacity>
  );
}
