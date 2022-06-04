import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
export default function ProjectCard({data, index, isCurrent}) {
  return (
    <ImageBackground
      source={{uri: 'https://via.placeholder.com/300'}}
      style={styles.cardImage}>
      <View
        style={[
          styles.card,
          {backgroundColor: data.backgroundColor},
          {transform: [{scale: isCurrent ? 1 : 0.95}]},
        ]}>
        <Text>{data.text}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    borderRadius: 30,
  },
});
