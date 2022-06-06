import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {BlackButton, SelectButton, Title} from '../../../../components/atoms';
import {DefaultTemplate} from '../../../../components/templates';

export default function ProjectNameScreen({route}) {
  const [selected, setSelected] = useState('');
  const {navigate} = useNavigation();
  const {categories, type} = route.params;

  const handleSubmit = () => {
    if (!selected.length) {
      Alert.alert('Impossible', "Veuillez sélectionner l'une des 3 options", [
        {text: 'OK'},
      ]);
      return;
    }

    navigate('ProjectName', {
      categories,
      type: selected,
    });
  };

  return (
    <DefaultTemplate>
      <View style={styles.container}>
        <View>
          <Title>Quel est le nom de votre projet ?</Title>
          <View style={styles.btnContainer}>
            <SelectButton
              style={styles.btn}
              onPress={() => setSelected('find_partner')}
              isChecked={selected === 'find_partner'}>
              Trouver un nouvel associé
            </SelectButton>
            <SelectButton
              style={styles.btn}
              onPress={() => setSelected('build_network')}
              isChecked={selected === 'build_network'}>
              Construire un réseau
            </SelectButton>
            <SelectButton
              style={styles.btn}
              onPress={() => setSelected('raise_funds')}
              isChecked={selected === 'raise_funds'}>
              Lever des fonds
            </SelectButton>
          </View>
        </View>
        <BlackButton size="large" onPress={() => handleSubmit()}>
          Suivant
        </BlackButton>
      </View>
    </DefaultTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  btnContainer: {
    marginVertical: 50,
  },
  btn: {
    marginVertical: 6,
  },
});
