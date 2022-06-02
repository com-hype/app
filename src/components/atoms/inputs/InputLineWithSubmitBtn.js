import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
} from 'react-native';

export function InputLineWithSubmitBtn({
  style = {},
  onChangeText = () => {},
  value = '',
  placeholder = '',
  secureTextEntry = false,
  btnImage = null,
  isValid = false,
  callback = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, styles.focus(isFocused)]}>
      <TextInput
        style={[styles.input, style]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <TouchableOpacity style={styles.btn} onPress={callback}>
        <ImageBackground
          resizeMode="cover"
          style={[styles.btn, styles.btnConfirm(isValid)]}
          source={btnImage}></ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 20,
  },
  input: {
    paddingBottom: 10,
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    width: '90%',
  },
  btn: {
    width: 20,
    height: 20,
  },
  focus: focused => {
    return {
      borderColor: focused ? '#000' : '#ccc',
    };
  },
  btnConfirm: isValid => {
    return {
      opacity: isValid ? 1 : 0.3,
    };
  },
});
