import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import {useSelector} from 'react-redux';

import {Paragraph, SubTitle, Title} from '../../../components/atoms';
import {DefaultTemplate, ScrollTemplate} from '../../../components/templates';
import {selectToken} from '../../authentication/user.redux';
import {fetchDiscussions} from '../chat.services';
import Card from './_components/card';

export default function ChatScreen() {
  const token = useSelector(selectToken);
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
    getDiscussions();
  }, []);

  return (
    <ScrollTemplate
      title="Messages"
      style={{marginHorizontal: 0}}
      onRefresh={getDiscussions}>
      {discussions.length ? (
        discussions.map(discussion => (
          <Card discussion={discussion} key={discussion.id} />
        ))
      ) : (
        <Paragraph>Aucune discussion</Paragraph>
      )}
    </ScrollTemplate>
  );
}
