import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export function DefaultTemplate({children, style = {}, ...props}) {
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      {...props}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>{children}</View>
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
