import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BlackButton, InputLine} from '../../components/atoms';
import DatePicker from 'react-native-date-picker';
import styles from './authentication.style';
import AuthHeader from './components/header';

export default function RegisterScreen() {
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
    number: '',
    password: '',
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('form', form);
  }, [form]);

  // convert date to string
  const dateToString = date => {
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    // ajouter le 0 devant les mois et les jours
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${day} / ${month} / ${year}`;
  };

  return (
    <SafeAreaView>
      <AuthHeader screen="register" />
      <View style={styles.formContainer}>
        <InputLine
          placeholderTextColor="#B4AEB9"
          placeholder="Prénom"
          value={form.firstName}
          keyboardType="default"
          onChangeText={text => setForm({...form, firstName: text})}
        />
        <InputLine
          placeholderTextColor="#B4AEB9"
          placeholder="Nom"
          value={form.lastName}
          keyboardType="default"
          onChangeText={text => setForm({...form, lastName: text})}
        />
        <InputLine
          placeholderTextColor="#B4AEB9"
          placeholder="Nom d'affichage"
          value={form.pseudo}
          keyboardType="default"
          onChangeText={text => setForm({...form, pseudo: text})}
        />

        <TouchableOpacity
          onPress={() => {
            setOpen(true);
            setForm({...form, birthDateDirty: true});
          }}
          style={styles.inputDate}>
          <Text
            style={
              form.birthDateDirty
                ? styles.inputTextDate
                : styles.inputTextDatePlaceholder
            }>
            {form.birthDateDirty
              ? dateToString(form.birthDate)
              : 'Date de naissance'}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          mode="date"
          date={form.birthDate}
          onConfirm={date => {
            setOpen(false);
            setForm({...form, birthDate: date});
          }}
          onCancel={() => {
            setOpen(false);
          }}
          cancelText="Annuler"
          confirmText="Confirmer"
          title="Date de naissance"
          minimumDate={new Date(1900, 1, 1)}
          maximumDate={
            new Date(
              new Date().getFullYear() - 18,
              new Date().getMonth(),
              new Date().getDate(),
            )
          }
          theme="light"
        />
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
        <BlackButton size="large" style={styles.submit}>
          Inscription
        </BlackButton>
      </View>
    </SafeAreaView>
  );
}
