import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {
  Title,
  Paragraph,
  BlackButton,
  BlackBorderButton,
} from '../../components/atoms';
import * as Animatable from 'react-native-animatable';

const {height} = Dimensions.get('window');

export default function NoProjects({refresh = () => {}}) {
  return (
    <Animatable.View animation="wobble">
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>🥶</Text>
      </View>
      <Title style={styles.title}>Aucun projet</Title>
      <Paragraph style={styles.paragraph}>
        Elargissez votre centre d'intérêt pour découvrir de nouveaux projets
      </Paragraph>
      <BlackButton size="large">Modifier</BlackButton>
      <BlackBorderButton
        size="large"
        style={styles.btn}
        onPress={() => refresh()}>
        Actualiser
      </BlackBorderButton>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  emojiContainer: {
    height: height / 2,
    marginTop: -30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 150,
    textAlign: 'center',
  },
  title: {
    color: '#000',
  },
  paragraph: {
    color: '#000',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  btn: {
    marginTop: 20,
  },
});
