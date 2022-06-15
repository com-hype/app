import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Title} from '../../../../components/atoms';

const {height} = Dimensions.get('window');
export default function Header({image, name, avatar, isMyProject = false}) {
  const {navigate} = useNavigation();
  return (
    <ImageBackground
      source={{
        uri: image ? image.url : 'https://via.placeholder.com/300',
      }}
      blurRadius={10}
      resizeMode="cover"
      style={styles.container}>
      <View style={styles.backgroundContainer} />
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{
            uri: avatar,
          }}
          resizeMode="cover"
          style={styles.avatar}
        />
      </View>
      <View style={styles.nameContainer}>
        <Title style={styles.title}>{name}</Title>
        {isMyProject && (
          <TouchableOpacity
            style={styles.stats}
            onPress={() => navigate('ProjectStats')}>
            <Image source={require('../../../../assets/img/icons/stats.png')} />
            <Text style={styles.statsText}>Voir les statistiques</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 190 : 150,
    justifyContent: Platform.OS === 'ios' ? 'flex-end' : 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  nameContainer: {
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.4,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
  },
  title: {
    color: '#fff',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -15,
  },
  statsText: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
});
