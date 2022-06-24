import React from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import globalStyle from '../messages.style';
import 'moment/locale/fr'; // without this line it didn't work
import moment from 'moment';
import {Paragraph} from '../../../../components/atoms';
import * as Animatable from 'react-native-animatable';
moment.locale('fr');
const {width} = Dimensions.get('window');

export default function MessageRight({message}) {
  return (
    <Animatable.View
      style={globalStyle.container}
      animation="slideInRight"
      duration={200}
      easing="ease-in">
      <View style={styles.message}>
        <Text style={globalStyle.messageText}>{message.body}</Text>
      </View>
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
    maxWidth: width * 0.9,
    minWidth: width / 3,
    alignSelf: 'flex-end',
    marginVertical: 8,
    backgroundColor: '#2940B4',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    paddingRight: 20,
  },
  timeText: {
    fontSize: 10,
    textAlign: 'right',
    marginTop: -3,
    marginRight: 20,
  },
});
