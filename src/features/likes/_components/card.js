import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SubTitle} from '../../../components/atoms';

const {width} = Dimensions.get('window');

export default function Card({project = {}, image = {}}) {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('ProjectDetails', {
          project: {
            info: project,
          },
        })
      }>
      <ImageBackground
        style={styles.container}
        blurRadius={10}
        source={
          image.url
            ? {uri: image.url}
            : require('../../../assets/img/bg-footer.png')
        }>
        <View style={styles.darkBackground} />
        <View style={styles.nameContainer}>
          <Image source={{uri: project.avatar}} style={styles.avatar} />
          <SubTitle numberOfLines={2} ellipsizeMode="head">
            {project.name}
          </SubTitle>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: width / 2 - 30,
    marginVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  darkBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.2,
  },
  nameContainer: {
    backgroundColor: '#fff',
    padding: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: -25,
    left: 10,
  },
});
