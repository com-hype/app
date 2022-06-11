import React from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    flex: 1,
    height: height,
    width: width,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
