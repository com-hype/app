import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export function DefaultTemplate({children, style = {}, ...props}) {
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      {...props}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animatable.View animation="fadeIn" duration={500} style={styles.inner}>
          {children}
        </Animatable.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    marginHorizontal: 24,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
