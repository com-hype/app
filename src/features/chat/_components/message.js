import React from 'react';
import {Text, View} from 'react-native';

export default function Message({message}) {
  console.log('message -> ', message);
  return (
    <View>
      <Text>{message.body}</Text>
    </View>
  );
}
