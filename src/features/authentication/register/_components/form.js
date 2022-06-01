import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {DescriptionLabel, InputLine} from '../../../../components/atoms';
import styles from '../../authentication.style';

export default function RegisterForm({form = {}, setForm = () => {}}) {
  const [open, setOpen] = useState(false);

  const dateToString = date => {
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;

    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${day} / ${month} / ${year}`;
  };

  return (
    <View style={styles.formContainer}>
      <InputLine
        placeholderTextColor="#B4AEB9"
        placeholder="Prénom*"
        value={form.first_name}
        keyboardType="default"
        onChangeText={text => setForm({...form, first_name: text})}
        autoFocus={true}
      />
      <InputLine
        placeholderTextColor="#B4AEB9"
        placeholder="Nom*"
        value={form.last_name}
        keyboardType="default"
        onChangeText={text => setForm({...form, last_name: text})}
      />
      <InputLine
        placeholderTextColor="#B4AEB9"
        placeholder="Nom d'affichage*"
        value={form.username}
        keyboardType="default"
        onChangeText={text => setForm({...form, username: text})}
      />

      <TouchableOpacity
        onPress={() => {
          setOpen(true);
          setForm({...form, birthdate_dirty: true});
        }}
        style={styles.inputDate}>
        <Text
          style={
            form.birthdate_dirty
              ? styles.inputTextDate
              : styles.inputTextDatePlaceholder
          }>
          {form.birthdate_dirty
            ? dateToString(form.birthdate)
            : 'Date de naissance*'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        mode="date"
        date={form.birthdate}
        onConfirm={date => {
          setOpen(false);
          setForm({...form, birthdate: date});
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
        placeholder="Email*"
        value={form.email}
        keyboardType="email-address"
        onChangeText={text => setForm({...form, email: text.toLowerCase()})}
      />
      <InputLine
        placeholderTextColor="#B4AEB9"
        placeholder="Mot de passe*"
        value={form.password}
        keyboardType="default"
        secureTextEntry={true}
        onChangeText={text => setForm({...form, password: text})}
        style={{marginBottom: 5}}
      />
      <DescriptionLabel>*Minimum 6 caractères</DescriptionLabel>
    </View>
  );
}
