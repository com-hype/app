import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  BlackButton,
  DescriptionLabel,
  InputLine,
  Title,
} from '../../../../components/atoms';
import {DefaultTemplate} from '../../../../components/templates';
import ImagePicker from 'react-native-image-crop-picker';

const {width} = Dimensions.get('window');

export default function ProjectNameScreen({route}) {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const {navigate} = useNavigation();
  const projectProps = route.params;

  const handleChoosePhoto = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 100,
        height: 100,
        cropping: true,
        includeBase64: true,
      });

      if (result.path) {
        console.log(result);
        setPhoto(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (name.length < 2) {
      Alert.alert('Impossible', 'Veuillez saisir le nom du projet', [
        {text: 'OK'},
      ]);
      return;
    }

    navigate('ProjectDescription', {
      ...projectProps,
      name,
      avatar: photo,
    });
  };

  return (
    <DefaultTemplate>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Title>Quel est le nom de votre projet ?</Title>
          <TouchableOpacity
            onPress={() => handleChoosePhoto()}
            style={styles.imageBtn}>
            <ImageBackground
              resizeMode="cover"
              style={styles.imageContainer}
              source={{
                uri: photo ? `data:${photo.mime};base64,${photo.data}` : null,
              }}>
              {photo && <View style={styles.backgroundIcon} />}
              <Image
                source={
                  photo
                    ? require('../../../../assets/img/icons/edit.png')
                    : require('../../../../assets/img/icons/picture.png')
                }
              />
            </ImageBackground>
          </TouchableOpacity>
          <DescriptionLabel style={styles.imageLabel}>Logo</DescriptionLabel>

          <InputLine
            placeholder="Nom du projet"
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <BlackButton size="large" onPress={() => handleSubmit()}>
          Suivant
        </BlackButton>
      </View>
    </DefaultTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  inputContainer: {
    alignItems: 'center',
  },
  imageBtn: {
    marginTop: 20,
  },
  imageContainer: {
    height: 104,
    width: 104,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C7C4C4',
  },
  backgroundIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  imageLabel: {
    color: '#000',
    marginTop: 5,
  },
  input: {
    marginTop: 30,
    width: width - 60,
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
  },
});
