import React from 'react';
import {View} from 'react-native';
import {BlackButton, Button} from '../../../components/atoms';
import styles from '../authentication.style';

export default function AuthHeader({screen = 'register'}) {
  return (
    <View style={styles.header}>
      {screen === 'login' ? (
        <BlackButton>CONNEXION</BlackButton>
      ) : (
        <Button textStyle={styles.disabled} opacity={0.4}>
          CONNEXION
        </Button>
      )}
      {screen === 'register' ? (
        <BlackButton>INSCRIPTION</BlackButton>
      ) : (
        <Button textStyle={styles.disabled} opacity={0.4}>
          INSCRIPTION
        </Button>
      )}
    </View>
  );
}
