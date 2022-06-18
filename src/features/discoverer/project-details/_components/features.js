import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Paragraph, SubTitle} from '../../../../components/atoms';

export default function Features({features = []}) {
  return (
    <View>
      <SubTitle style={styles.subTitle}>Fonctionnalités</SubTitle>
      {features.length ? (
        features.map((feature, index) => (
          <View key={index} style={styles.textContainer}>
            <Text style={styles.title}>{feature.name}</Text>
            <Text style={styles.paragraph}>{feature.description}</Text>
          </View>
        ))
      ) : (
        <Paragraph style={styles.emptyText}>
          Aucune fonctionnalité n'a été ajoutée pour ce projet.
        </Paragraph>
      )}
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
  emptyText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    marginVertical: 50,
    marginHorizontal: 24,
  },
});
