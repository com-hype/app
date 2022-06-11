import React from 'react';
import {View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from '../authentication.style';
import {BlackButton, Paragraph, Title} from '../../../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {updateHeader} from '../user.redux';

export default function RegisterConfirmationScreen() {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await dispatch(updateHeader({status: 'done', connected: true}));
  };

  return (
    <SafeAreaView>
      <View style={styles.confirmationContainer}>
        <Title>Félicitations !</Title>

        <Image
          style={styles.confirmationIcon}
          source={require('../../../assets/img/valid-icon.png')}
        />

        <Paragraph>La création de votre compte est confirmée !</Paragraph>
        <Paragraph>Vous pouvez maintenant accéder à COMHYPE.</Paragraph>
      </View>
      <View style={styles.submitContainer}>
        <BlackButton size="large" style={styles.submit} onPress={handleSubmit}>
          Continuer
        </BlackButton>
      </View>
    </SafeAreaView>
  );
}
