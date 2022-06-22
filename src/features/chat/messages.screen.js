import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {useSelector} from 'react-redux';
import Pusher from 'pusher-js/react-native';

import {SubTitle, Title} from '../../components/atoms';
import {DefaultTemplate, ScrollTemplate} from '../../components/templates';
import {selectToken, selectUser} from '../authentication/user.redux';
import Loading from '../authentication/_components/loading';
import {fetchDiscussions, fetchMessages} from './chat.services';
import Card from './_components/card';
import Message from './_components/message';

let pusher = new Pusher('76af20e9e12a3ba167d2', {
  cluster: 'eu',
});

export default function MessagesScreen({route}) {
  const {discussionId} = route.params;
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({});
  let channel = pusher.subscribe(`user.${user.id}`);
  channel.bind('user.receive.message', data => {
    receiveMessage(data?.message);
  });
  const getMessages = async () => {
    const messagesRes = await fetchMessages(discussionId, token);
    if (messagesRes.status === 'done') {
      setMessages(messagesRes.response);
    } else {
      alert(messagesRes.response);
    }
  };

  const receiveMessage = message => {
    console.log(message);
    setMessages({...messages, messages: [...messages.messages, message]});
  };

  useEffect(() => {
    getMessages();

    return () => {
      setMessages({});
    };
  }, []);

  return (
    <ScrollTemplate
      title={messages.title}
      style={{marginHorizontal: 0}}
      onRefresh={getMessages}>
      {messages?.messages?.map(message => (
        <Message message={message} key={message.id} />
      ))}
    </ScrollTemplate>
  );
}
