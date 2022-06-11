'use strict';

import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import {defaultsStyles} from './Styles';
const {width} = Dimensions.get('window');

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={defaultsStyles.noMoreCardsText}>No more cards</Text>
      </View>
    );
  }
}

function ActionView({icon, type}) {
  return (
    <View
      style={[
        styles.container,
        type === 'like' ? styles.containerLike : styles.containerDislike,
      ]}>
      <Image source={icon} style={styles.likeIcon} />
    </View>
  );
}

export default {
  NoMoreCards,
  ActionView,
};

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    position: 'absolute',
    top: -350,
  },
  containerLike: {
    left: -width / 2 + 25,
    alignItems: 'flex-end',
  },
  containerDislike: {
    left: -width / 2 + 25,
  },
  likeIcon: {
    height: 90,
    width: 90,
  },
  dislikeIcon: {
    height: 90,
    width: 90,
  },
});
