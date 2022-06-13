import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {InputLine} from '../../../../components/atoms';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
export default function FeatureInput({
  index = 0,
  name = '',
  description = '',
  onChange = () => {},
  onDelete = () => {},
}) {
  return (
    <Animatable.View
      style={styles.container}
      animation="fadeInLeft"
      duration={500}
      delay={index * 100}>
      <TouchableOpacity style={styles.delete} onPress={() => onDelete(index)}>
        <FontAwesome name="times" size={14} color="#fff" />
      </TouchableOpacity>
      <InputLine
        style={styles.input}
        placeholder="Nom de la fonctionnalité"
        value={name}
        onChangeText={text => onChange(text, index, 'name')}
      />
      <InputLine
        style={styles.inputDescription}
        multiline={true}
        placeholder="Description de la fonctionnalité"
        value={description}
        onChangeText={text => onChange(text, index, 'description')}
      />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  input: {
    marginVertical: 5,
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: 10,
  },
  inputDescription: {
    marginVertical: 5,
    maxHeight: 100,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  delete: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#E56161',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
