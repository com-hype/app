import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser, selectUser} from '../../authentication/user.redux';

export default function OnboardingScreen() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <Text>Bienvenue {user.pseudo}</Text>
      <TouchableOpacity onPress={() => dispatch(deleteUser())}>
        <Text>Déconnxion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
