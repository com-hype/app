import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DescriptionLabel, SubTitle} from '../../../../components/atoms';
import * as Animatable from 'react-native-animatable';

export default function FundingBar({crowdfunding = {}}) {
  const getPercentage = () => {
    const total = Number(crowdfunding.goal);
    const current = Number(crowdfunding.amount);
    const percentage = (current / total) * 100;
    return Math.round(percentage);
  };
  return (
    <View style={styles.container}>
      <SubTitle style={styles.goal}>
        {getPercentage()}% de fonds récoltés !
      </SubTitle>
      <View style={styles.progressBar}>
        <Animatable.View
          animation="slideInLeft"
          delay={500}
          style={[styles.progressBarFill, {width: `${getPercentage()}%`}]}
        />
      </View>
      <DescriptionLabel style={styles.goalDescription}>
        {Number(crowdfunding.amount).toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        })}{' '}
        /{' '}
        {Number(crowdfunding.goal).toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        })}
      </DescriptionLabel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  goal: {
    textAlign: 'center',
    marginTop: 30,
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#DBDBDB',
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: 0,
    height: '100%',
    backgroundColor: '#94FF94',
    borderRadius: 10,
  },
  goalDescription: {
    marginTop: 10,
    textAlign: 'center',
  },
});
