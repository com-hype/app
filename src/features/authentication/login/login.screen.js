import React, {useState} from 'react';
import {View} from 'react-native';

import {BlackButton, ErrorLabel, InputLine} from '../../../components/atoms';
import styles from '../authentication.style';
import AuthHeader from '../_components/header';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Container from '../_components/container';
import {sendLogin} from './login.services';
import {useDispatch} from 'react-redux';
import {setUser} from '../user.redux';
import Loading from '../_components/loading';

GoogleSignin.configure({
  webClientId:
    '332057449320-krifgbtn753r6j7752jvdv5bo2s30n83.apps.googleusercontent.com',
});

export default function LoginScreen() {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      setError(null);
      setLoading(true);

      const firebase_res = await auth().signInWithEmailAndPassword(
        form.email,
        form.password,
      );
      if (!firebase_res.user) return;
      const res = await sendLogin({
        email: firebase_res.user.email,
        uid: firebase_res.user.uid,
      });

      setLoading(false);
      if (res.status === 'error') {
        setError('Une erreur est survenue');
        return;
      }
      dispatch(
        setUser({
          header: {
            status: 'done',
            connected: true,
          },
          user: res.response.user,
        }),
      );
    } catch (error) {
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        setError('Mot de passe incorrect');
      } else {
        setError('Une erreur est survenue');
      }
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <AuthHeader screen="login" />
      <Container>
        <View style={styles.formContainer}>
          <InputLine
            placeholderTextColor="#B4AEB9"
            placeholder="Email"
            value={form.email}
            keyboardType="email-address"
            onChangeText={text => setForm({...form, email: text})}
          />
          <InputLine
            placeholderTextColor="#B4AEB9"
            placeholder="Mot de passe"
            value={form.password}
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={text => setForm({...form, password: text})}
          />
        </View>
        <View style={styles.submitContainer}>
          <BlackButton
            size="large"
            style={styles.submit}
            onPress={() => handleSubmit()}>
            Connexion
          </BlackButton>
          {error ? <ErrorLabel>{error}</ErrorLabel> : null}
        </View>
      </Container>
      {loading ? <Loading /> : null}
    </React.Fragment>
  );
}
