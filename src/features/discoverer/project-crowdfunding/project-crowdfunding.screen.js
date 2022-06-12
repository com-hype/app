import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  DescriptionLabel,
  InputLine,
  Paragraph,
  SubTitle,
  Title,
} from '../../../components/atoms';
import Header from '../project-details/_components/header';
import Payment from './_components/payment';

const {width} = Dimensions.get('window');

export default function ProjectCrowfundingScreen({route}) {
  const {info, crowdfunding} = route.params.project;
  const restAmount = crowdfunding.goal - crowdfunding.amount;
  const [amount, setAmount] = useState(0);

  const getPercentage = () => {
    const total = crowdfunding.goal;
    const current = crowdfunding.amount;
    const percentage = (current / total) * 100;
    return percentage;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Header
            image={info.images[0]}
            name={info.name}
            avatar={info.avatar}
          />
          <View style={styles.container}>
            <SubTitle style={styles.goal}>
              {getPercentage()}% de fonds récoltés !
            </SubTitle>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressBarFill, {width: `${getPercentage()}%`}]}
              />
            </View>
            <DescriptionLabel style={styles.goalDescription}>
              {crowdfunding.amount.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              })}{' '}
              /{' '}
              {crowdfunding.goal.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              })}
            </DescriptionLabel>
            <SubTitle style={styles.descriptionTitle}>
              À quoi serviront ces fonds ?
            </SubTitle>

            <Paragraph style={styles.description}>
              {crowdfunding.description}
            </Paragraph>
            <SubTitle style={styles.descriptionTitle}>
              Combien souhaitez-vous envoyer ?
            </SubTitle>
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>
                {amount.toLocaleString('fr-FR', {
                  currency: 'EUR',
                })}{' '}
                €
              </Text>
              <InputLine
                style={styles.amountInput}
                value={String(amount)}
                keyboardType={
                  Platform.OS === 'android' ? 'numeric' : 'number-pad'
                }
                onChangeText={text => {
                  if (Number(text) && Number(text) > 0) {
                    if (Number(text) > restAmount) {
                      setAmount(restAmount);
                    } else {
                      setAmount(Number(text));
                    }
                  } else {
                    setAmount(0);
                  }
                }}
                autoFocus={true}
              />
              <View style={styles.borderBottom} />
            </View>
            <Payment amount={amount} projectId={info.id} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 50,
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
  },
  progressBarFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#94FF94',
    borderRadius: 10,
  },
  goalDescription: {
    marginTop: 10,
    textAlign: 'center',
  },
  descriptionTitle: {
    marginTop: 30,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 14,
  },
  description: {
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#767676',
  },
  amountText: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontFamily: 'Montserrat-Bold',
    fontSize: 50,
    color: '#767676',
    textAlign: 'center',
    width: width - 48,
  },
  amountContainer: {
    marginTop: 10,
  },
  amountInput: {
    opacity: 0,
    height: 61,
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: 50,
    textAlign: 'center',
  },
  borderBottom: {
    width: width - 48,
    height: 1,
    backgroundColor: '#767676',
    position: 'absolute',
    top: 61,
  },
});
