import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SubTitle} from '../../../../components/atoms';

export default function Features({features = []}) {
  return (
    <View>
      <SubTitle style={styles.subTitle}>Fonctionnalités</SubTitle>
      {features.map((feature, index) => (
        <View key={index} style={styles.textContainer}>
          <Text style={styles.title}>{feature.name}</Text>
          <Text style={styles.paragraph}>{feature.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  textContainer: {
    marginHorizontal: 24,
    marginVertical: 10,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  paragraph: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    marginTop: 5,
  },
});
