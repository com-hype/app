import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import Pusher from 'pusher-js/react-native';

import {ScrollTemplate} from '../../../components/templates';
import {selectToken, selectUser} from '../../authentication/user.redux';
import {fetchMessages, sendMessage} from '../chat.services';
import MessageRight from './_components/messageRight';
import MessageLeft from './_components/messageLeft';
import {View} from 'react-native-animatable';
import {BlackButton, Input, Title} from '../../../components/atoms';

let pusher = new Pusher('76af20e9e12a3ba167d2', {
  cluster: 'eu',
});

const {width, height} = Dimensions.get('window');

export default function MessagesScreen({route}) {
  const {discussionId} = route.params;
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  let channel = pusher.subscribe(`user.${user.id}`);

  const getMessages = async () => {
    const messagesRes = await fetchMessages(discussionId, token);
    if (messagesRes.status === 'done') {
      setTitle(messagesRes.response.title);
      setMessages(messagesRes.response.messages.reverse());
    } else {
      alert(messagesRes.response);
    }
  };

  useEffect(() => {
    getMessages();
    channel.bind('user.receive.message', data => {
      getMessages();
    });

    return () => {
      setMessages([]);
    };
  }, []);

  const getMessageType = message => {
    if (message.author.id === user.id) {
      return <MessageRight message={message} key={message.id} />;
    } else if (message.author.id !== user.id) {
      return <MessageLeft message={message} key={message.id} />;
    }
  };

  const handleSubmit = async () => {
    if (!message.length) return;
    const msg = await sendMessage(discussionId, message, token);
    if (msg.status === 'done') {
      setMessage('');
      getMessages();
    }
  };

  return (
    <React.Fragment>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>{title}</Title>
      </View>
      <ScrollView
        style={styles.container}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        {messages.map(message => getMessageType(message))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          value={message}
          onChangeText={text => setMessage(text)}
          multiline={true}
          placeholder="Écrivez votre message..."
        />
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Image
            source={require('../../../assets/img/icons/send.png')}
            style={styles.btnIcon}
          />
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#000',
    borderBottomLeftRadius: 60,
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 120 : 100,
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    color: '#fff',
  },
  container: {
    marginTop: 20,
    flex: 1,
    marginHorizontal: 0,
  },
  inputContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    // paddingBottom: Platform.OS === 'android' ? 0 : 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    minHeight: 36,
    maxHeight: 100,
    width: width - 100,
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
  btn: {
    height: 36,
    width: 36,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    height: 14,
    width: 14,
  },
});
