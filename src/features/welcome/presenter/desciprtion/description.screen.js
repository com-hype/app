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

const {width} = Dimensions.get('window');

export default function ProjectDescriptionScreen({route}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {navigate} = useNavigation();
  const projectProps = route.params;

  const handleSubmit = () => {
    if (title.length < 2) {
      Alert.alert('Impossible', 'Veuillez saisir le titre du projet', [
        {text: 'OK'},
      ]);
      return;
    }
    if (description.length < 10) {
      Alert.alert('Impossible', 'Veuillez saisir la description du projet', [
        {text: 'OK'},
      ]);
      return;
    }

    navigate('ProjectImages', {
      ...projectProps,
      title,
      description,
    });
  };

  return (
    <DefaultTemplate>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Title>Décrivez brièvement votre projet :</Title>

          <InputLine
            placeholder="Titre (ex: Plateforme de marketing)"
            style={styles.inputTitle}
            value={title}
            onChangeText={text => {
              if (text.length <= 40) setTitle(text);
            }}
          />
          <DescriptionLabel style={styles.label}>
            {title.length}/40
          </DescriptionLabel>
          <InputLine
            multiline={true}
            numberOfLines={4}
            placeholder="Description du projet"
            style={styles.input}
            value={description}
            onChangeText={text => {
              if (text.length <= 150) setDescription(text);
            }}
          />
          <DescriptionLabel style={styles.label}>
            {description.length}/150
          </DescriptionLabel>
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
  inputTitle: {
    marginTop: 30,
    width: width - 60,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    borderColor: '#000',
  },
  label: {
    marginTop: -15,
    width: width - 60,
    textAlign: 'right',
    color: '#000',
  },
  input: {
    marginTop: 30,
    width: width - 60,
    fontSize: 14,
    borderColor: '#000',
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
});
