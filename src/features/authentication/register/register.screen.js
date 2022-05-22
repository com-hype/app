import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {sendregister} from './register.services';
import styles from '../authentication.style';
import validateEmail from '../authentication.helpers';

import AuthHeader from '../_components/header';
import {BlackButton, ErrorLabel} from '../../../components/atoms';
import Loading from '../_components/loading';
import RegisterForm from './_components/form';
import Container from '../_components/container';
import {useNavigation} from '@react-navigation/native';

// GoogleSignin.configure({
//   webClientId:
//     '332057449320-krifgbtn753r6j7752jvdv5bo2s30n83.apps.googleusercontent.com',
// });

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    pseudo: '',
    birthDate: new Date(
      new Date().getFullYear() - 18,
      new Date().getMonth(),
      new Date().getDate(),
    ),
    birthDateDirty: false,
    email: '',
    password: '',
  });

  useEffect(() => {
    setIsValid(
      form.firstName.length > 0 &&
        form.lastName.length > 0 &&
        form.pseudo.length > 0 &&
        form.birthDateDirty &&
        form.birthDateDirty &&
        validateEmail(form.email) &&
        form.password.length > 6,
    );
  }, [form]);

  const handleSubmit = async () => {
    if (!isValid) {
      Alert.alert(
        'Impossible',
        'Veuillez remplir tous les champs correctement',
        [{text: 'OK'}],
      );
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const res = await sendregister(form);
      if (res.status === 'error') {
        setError(res.response);
      } else {
        navigation.navigate('RegisterConfirmation');
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <AuthHeader screen="register" />
      <Container>
        <RegisterForm form={form} setForm={setForm} />
        <View style={styles.submitContainer}>
          <BlackButton
            size="large"
            style={styles.submit}
            onPress={() => handleSubmit()}>
            Inscription
          </BlackButton>
          {error ? <ErrorLabel>{error}</ErrorLabel> : null}
        </View>
      </Container>
      {loading ? <Loading /> : null}
    </React.Fragment>
  );
}
