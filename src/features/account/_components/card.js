import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BlackBorderButton, Paragraph, Title} from '../../../components/atoms';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import styles from '../account.style';

export default function Card({
  backgroundColor = '#fff',
  iconName = 'heart',
  textColor = '#000',
  title,
  subTitle,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[styles.projectContainer, {backgroundColor: backgroundColor}]}>
        <FontAwesome name={iconName} size={40} color={textColor} solid />
        <View style={styles.cardText}>
          <Title style={[styles.projectTitle, {color: textColor}]}>
            {title}
          </Title>
          <Paragraph style={{color: textColor}}>{subTitle}</Paragraph>
        </View>
        {/* <TouchableOpacity>
          <FontAwesome name="chevron-right" size={25} color={textColor} />
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
}
