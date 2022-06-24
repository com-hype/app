import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {Paragraph, SubTitle, Title} from '../../../../components/atoms';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import 'moment/locale/fr';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../authentication/user.redux';
moment.locale('fr');
export default function Card({discussion}) {
  const {navigate} = useNavigation();
  const user = useSelector(selectUser);

  const isNewmessage = discussion => {
    if (
      discussion.newMessage &&
      discussion.lastMessage?.messageable_id !== user.id
    ) {
      return true;
    }
    return false;
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigate('DiscussionMessages', {discussionId: discussion.id})
      }>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {isNewmessage(discussion) && (
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              style={styles.circle}
            />
          )}
          <SubTitle style={styles.title} numberOfLines={1}>
            {discussion.title}
          </SubTitle>
        </View>
        <View style={styles.detailsContainer}>
          <Paragraph style={styles.message} numberOfLines={1}>
            {discussion.lastMessage
              ? discussion.lastMessage.body
              : 'Aucun message...'}
          </Paragraph>
          <Paragraph style={styles.lastMessageTime}>
            {moment(discussion.lastMessage.created_at).fromNow()}
          </Paragraph>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#F4F2F2',
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: 24,
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessageTime: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#352641',
  },
  titleContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    color: '#352641',
    marginTop: 0,
  },
  message: {
    textAlign: 'left',
    fontSize: 13,
    color: '#352641',
    opacity: 0.7,
    marginBottom: 5,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#3484F7',
    marginRight: 5,
  },
});
