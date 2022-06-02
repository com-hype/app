import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
export default function ProjectCard({data, index, isCurrent}) {
  return (
    <View
      style={[
        styles.card,
        {backgroundColor: data.backgroundColor},
        {transform: [{scale: isCurrent ? 1 : 0.95}]},
      ]}>
      <Text>{data.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    borderRadius: 30,
  },
});
