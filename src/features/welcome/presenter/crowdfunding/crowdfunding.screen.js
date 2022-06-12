import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Alert, Dimensions} from 'react-native';
import {
  BlackButton,
  InputLine,
  Title,
  SubTitle,
} from '../../../../components/atoms';
import {Slider} from '@miblanchard/react-native-slider';

import {DefaultTemplate} from '../../../../components/templates';

const {width} = Dimensions.get('window');

export default function ProjectCrowdfundingScreen({route}) {
  const [goal, setGoal] = useState(10000);
  const [description, setDescription] = useState('');
  const {navigate} = useNavigation();
  const projectProps = route.params;
  const renderAboveThumbComponent = goal => {
    return (
      <SubTitle style={styles.thumbContainer}>
        {goal.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}
      </SubTitle>
    );
  };

  const handleSubmit = () => {
    if (description.length < 10) {
      Alert.alert('Impossible', 'Veuillez saisir la description du projet', [
        {text: 'OK'},
      ]);
      return;
    }

    navigate('ProjectImages', {
      ...projectProps,
      crowdfunding_goal: goal,
      crowdfunding_description: description,
    });
  };

  return (
    <DefaultTemplate>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Title>Financement participatif</Title>
          <View style={styles.sliderContainer}>
            <SubTitle style={styles.slideLabel}>
              Combien cherchez-vous à collecter ?
            </SubTitle>
            <Slider
              value={goal}
              onValueChange={value => setGoal(value[0])}
              minimumValue={100}
              step={100}
              maximumValue={50000}
              containerStyle={styles.sliderInput}
              animateTransitions={true}
              renderAboveThumbComponent={() => renderAboveThumbComponent(goal)}
            />
          </View>
          <SubTitle style={styles.label}>
            Décrivez brièvement à quoi vous servirons les fonds collectés
          </SubTitle>
          <InputLine
            multiline={true}
            numberOfLines={4}
            placeholder="Description"
            style={styles.input}
            value={description}
            onChangeText={text => {
              if (text.length <= 150) setDescription(text);
            }}
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
  sliderInput: {
    width: width - 55,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  slideLabel: {
    marginBottom: 50,
    textAlign: 'left',
    width: width - 55,
  },
  inputTitle: {
    marginTop: 30,
    width: width - 60,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    borderColor: '#000',
  },
  label: {
    marginTop: 40,
    width: width - 55,
    marginBottom: 0,
    color: '#000',
  },
  input: {
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
  thumbContainer: {
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden',
    left: -width / 1.8,
  },
});
