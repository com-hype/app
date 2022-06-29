import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

export function BackButton({hiddenText = false}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backBtn}>
      <Image source={require('../../../assets/img/icons/arrow-left.png')} />
      {!hiddenText && <Text style={styles.back}>Retour</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 10,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  back: {
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
});
