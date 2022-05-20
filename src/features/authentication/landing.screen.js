import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const {height, width} = Dimensions.get('window');

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

          <TouchableOpacity style={styles.loginContainer}>
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

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  logo: {
    marginTop: 0,
  },
  subTitle: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    paddingHorizontal: 60,
    paddingTop: 50,
    paddingBottom: 40,
  },

  loginContainer: {
    width: width,
    borderTopLeftRadius: 80,
    overflow: 'hidden',
  },
  login: {
    backgroundColor: '#DBDBDB',
    paddingVertical: 30,
    justifyContent: 'flex-start',
    width: '100%',
    height: 180,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
    textAlign: 'center',
  },

  registerContainer: {
    width: width,
    borderTopLeftRadius: 80,
    overflow: 'hidden',
    position: 'absolute',
  },
  register: {
    backgroundColor: '#000',
    paddingVertical: 30,
    justifyContent: 'flex-start',
    height: 100,
    width: '100%',
  },
  registerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
});
