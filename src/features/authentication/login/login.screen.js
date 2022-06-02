import React, {useState} from 'react';
import {View} from 'react-native';
import {getUniqueId} from 'react-native-device-info';

import {BlackButton, ErrorLabel, InputLine} from '../../../components/atoms';
import styles from '../authentication.style';
import AuthHeader from '../_components/header';
import Container from '../_components/container';
import {sendLogin} from './login.services';
import {useDispatch} from 'react-redux';
import {login, setUser} from '../user.redux';
import Loading from '../_components/loading';

export default function LoginScreen() {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    device_name: getUniqueId(),
  });

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    const {payload} = await dispatch(login(form));

    if (payload.status === 'error') {
      setError(payload.response);
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
            onChangeText={text =>
              setForm({...form, email: text.toLowerCase().replace(/\s/g, '')})
            }
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
