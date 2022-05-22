import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {BlackButton, Button} from '../../../components/atoms';
import styles from '../authentication.style';

export default function AuthHeader({screen = 'register'}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {screen === 'login' ? (
        <BlackButton style={{alignSelf: 'center'}}>CONNEXION</BlackButton>
      ) : (
        <Button
          style={{alignSelf: 'center'}}
          textStyle={styles.disabled}
          opacity={0.4}
          onPress={() => navigation.navigate('Login')}>
          CONNEXION
        </Button>
      )}

      {screen === 'register' ? (
        <BlackButton style={{alignSelf: 'center'}}>INSCRIPTION</BlackButton>
      ) : (
        <Button
          style={{alignSelf: 'center'}}
          textStyle={styles.disabled}
          opacity={0.4}
          onPress={() => navigation.navigate('Register')}>
          INSCRIPTION
        </Button>
      )}
    </View>
  );
}
