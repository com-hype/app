import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {Paragraph, SubTitle, Title} from '../../../components/atoms';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

export default function Card({discussion}) {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('DiscussionMessages', {discussionId: discussion.id})
      }>
      <View
        style={[
          styles.container,
          discussion.newMessage && styles.newMessageContainer,
        ]}>
        <View style={styles.titleContainer}>
          {discussion.newMessage && (
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
        <Paragraph style={styles.message} numberOfLines={1}>
          {discussion.lastMessage.length
            ? discussion.lastMessage
            : 'Aucun message...'}
        </Paragraph>
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
  newMessageContainer: {
    borderWidth: 1,
    borderColor: '#3484F7',
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
    fontSize: 12,
    color: '#352641',
    opacity: 0.5,
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
