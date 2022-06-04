import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BlackButton, Paragraph, Title} from '../../components/atoms';
import {DefaultTemplate} from '../../components/templates';
import {logout, selectUser} from '../authentication/user.redux';
export default function AccountScreen() {
  const user = useSelector(selectUser);
  const route = useRoute();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('UPDATE', route);
  }, [route.key]);
  return (
    <DefaultTemplate>
      <View>
        <Title>Compte</Title>
        <View>
          <Paragraph>Nom: {user.first_name}</Paragraph>
          <Paragraph>Prénom: {user.last_name}</Paragraph>
          <Paragraph>Pseudo: {user.username}</Paragraph>
          <Paragraph>Account type: {user.type}</Paragraph>
          <BlackButton onPress={() => dispatch(logout())}>
            Déconexxion
          </BlackButton>
        </View>
      </View>
    </DefaultTemplate>
  );
}
