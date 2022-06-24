import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import {useSelector} from 'react-redux';
import Pusher from 'pusher-js/react-native';

import {Paragraph, SubTitle, Title} from '../../../components/atoms';
import {DefaultTemplate, ScrollTemplate} from '../../../components/templates';
import {selectToken, selectUser} from '../../authentication/user.redux';
import {fetchDiscussions} from '../chat.services';
import Card from './_components/card';

let pusher = new Pusher('76af20e9e12a3ba167d2', {
  cluster: 'eu',
});

export default function ChatScreen({navigation}) {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  let channel = pusher.subscribe(`user.${user.id}`);

  const [loading, setLoading] = useState(false);
  const [discussions, setDiscussions] = useState([]);

  const getDiscussions = async () => {
    setLoading(true);
    const discussionsRes = await fetchDiscussions(token);
    if (discussionsRes.status === 'done') {
      setDiscussions(discussionsRes.response);
    } else {
      alert(discussionsRes.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDiscussions();
    });
    channel.bind('user.receive.message', () => {
      getDiscussions();
    });
    return () => {
      setLoading(false);
      setDiscussions([]);
      channel.unbind('user.receive.message');
      unsubscribe;
    };
  }, []);

  return (
    <ScrollTemplate
      title="Messages"
      style={{marginHorizontal: 0}}
      onRefresh={getDiscussions}>
      {discussions.length ? (
        discussions
          .sort((a, b) => {
            return (
              new Date(b?.lastMessage?.created_at) -
              new Date(a?.lastMessage?.created_at)
            );
          })
          .map(discussion => (
            <Card discussion={discussion} key={discussion.id} />
          ))
      ) : (
        <Paragraph>Aucune discussion</Paragraph>
      )}
    </ScrollTemplate>
  );
}
