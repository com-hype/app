import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {Paragraph} from '../../../../components/atoms';
import * as Animatable from 'react-native-animatable';
import globalStyle from '../messages.style';
import 'moment/locale/fr';
moment.locale('fr');

const {width} = Dimensions.get('window');

export default function MessageLeft({message}) {
  return (
    <Animatable.View
      style={globalStyle.container}
      animation="slideInLeft"
      duration={200}
      easing="ease-in">
      <View style={globalStyle.authorContainer}>
        <Image
          source={
            message.author.avatar
              ? {uri: message.author.avatar}
              : require('../../../../assets/img/icons/user.png')
          }
          style={globalStyle.avatar}
        />
        <Text style={globalStyle.username}>{message.author.username}</Text>
      </View>
      <TouchableOpacity style={styles.message}>
        <Text style={globalStyle.messageText}>{message.body}</Text>
      </TouchableOpacity>
      <Paragraph style={styles.timeText}>
        {moment(message.created_at).fromNow()}
      </Paragraph>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  message: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxWidth: width * 0.8,
    alignSelf: 'flex-start',
    marginVertical: 8,
    backgroundColor: '#9599B3',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    paddingLeft: 20,
  },
  timeText: {
    fontSize: 10,
    textAlign: 'left',
    marginTop: -3,
    marginLeft: 20,
  },
});
