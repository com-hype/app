import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BlackBorderButton, BlackButton, Title} from '../../../components/atoms';

const {height} = Dimensions.get('window');

export default function UserTypeScreen() {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Title>Vous utilisez COMHYPE pour :</Title>

        <View style={styles.actionsContainer}>
          <BlackButton
            style={styles.btn}
            size="large"
            onPress={() => navigate('ProjectCategories')}>
            Présenter votre projet
          </BlackButton>
          <BlackBorderButton
            style={styles.btn}
            size="large"
            onPress={() => navigate('UserHobbies')}>
            Découvrir des projets
          </BlackBorderButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 100,
    height: height,
  },
  actionsContainer: {
    width: '100%',
    marginVertical: 100,
  },
  btn: {
    marginVertical: 15,
  },
});
