import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import styles from './landing.style';

export default function LandingScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/img/landing-background.png')}
        style={styles.background}>
        <View style={styles.footerContainer}>
          <Text style={styles.title}>Bienvenue sur</Text>
          <Image
            source={require('../../assets/img/landing-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.subTitle}>
            La meilleure manière de donner de l'intérêt aux projets qui en
            valent la peine.
          </Text>

          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => navigation.navigate('Login')}>
            <View style={styles.login}>
              <Text style={styles.loginText}>Connexion</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerContainer}
            onPress={() => navigation.navigate('Register')}>
            <View style={styles.register}>
              <Text style={styles.registerText}>Inscription</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
