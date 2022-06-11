import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';

import {getUniqueId} from 'react-native-device-info';

import styles from '../authentication.style';
import validateEmail from '../authentication.helpers';

import AuthHeader from '../_components/header';
import {BlackButton, ErrorLabel} from '../../../components/atoms';
import Loading from '../_components/loading';
import RegisterForm from './_components/form';
import Container from '../_components/container';
import {useNavigation} from '@react-navigation/native';
import {sendRegister} from '../authentication.services';
import {useDispatch} from 'react-redux';
import {register} from '../user.redux';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    birthdate: new Date(
      new Date().getFullYear() - 18,
      new Date().getMonth(),
      new Date().getDate(),
    ),
    birthdate_dirty: false,
    email: '',
    password: '',
    device_name: getUniqueId(),
  });

  useEffect(() => {
    setIsValid(
      form.first_name.length > 0 &&
        form.last_name.length > 0 &&
        form.username.length > 0 &&
        form.birthdate_dirty &&
        form.birthdate_dirty &&
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

    setError(null);
    setLoading(true);
    // const res = await sendRegister(form);
    // if (res.status === 'error') {
    //   setError(res.response);
    //   setLoading(false);
    // } else {
    //   navigation.navigate('RegisterConfirmation');
    // }

    const {payload} = await dispatch(register(form));

    if (payload.status === 'error') {
      setError(payload.response);
      setLoading(false);
      return;
    }

    console.log(payload.response);

    navigation.navigate('RegisterConfirmation');
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
