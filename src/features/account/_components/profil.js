import React from 'react';
import {View, Text} from 'react-native';
import {BlackBorderButton, Title} from '../../../components/atoms';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import styles from '../account.style';

export default function ProfilCard({user}) {
  return (
    <View style={styles.porfilContainer}>
      <View style={styles.avatar}>
        <FontAwesome name="user" size={50} color="#EDEDED" solid />
      </View>
      <View style={styles.profilRightContainer}>
        <Title style={styles.profilTitle}>
          {user.first_name} {user.last_name}
        </Title>
        <Text style={styles.profilSubTitle}>{user.username} </Text>
        <BlackBorderButton
          size="small"
          style={styles.profilBtn}
          textStyle={styles.profilBtnText}>
          Modifier
        </BlackBorderButton>
      </View>
    </View>
  );
}
