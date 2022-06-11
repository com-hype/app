import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import hobbiesDefaultlist from './categories.utils';
import {
  BlackBorderButton,
  BlackButton,
  InputLineWithSubmitBtn,
  Paragraph,
  Title,
} from '../../../../components/atoms';
import {DefaultTemplate} from '../../../../components/templates';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
export default function ProjectCategoriesScreen() {
  const [hobbies, setHobbies] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [customHobbie, setCustomHobbie] = useState('');
  const {navigate} = useNavigation();
  useEffect(() => {
    setHobbies([...hobbiesDefaultlist]);
  }, []);

  const handleSelectHobbie = (hobby, action) => {
    if (action === 'add') {
      setSelectedHobbies([...selectedHobbies, hobby]);
    } else {
      setSelectedHobbies(selectedHobbies.filter(item => item !== hobby));
    }
  };

  const handleAddCustomHobbie = () => {
    if (customHobbie.length > 2) {
      setHobbies([...hobbies, customHobbie]);
      setSelectedHobbies([...selectedHobbies, customHobbie]);
      setCustomHobbie('');
      Keyboard.dismiss();
    }
  };

  const handleSubmit = async () => {
    if (selectedHobbies.length < 1) {
      Alert.alert(
        'Impossible',
        "Veuillez sélectionner au moins un centre d'intérêt",
        [{text: 'OK'}],
      );
      return;
    }
    let formatedHobbies = JSON.stringify(selectedHobbies);
    formatedHobbies = formatedHobbies
      .substring(1, formatedHobbies.length - 1)
      .replace(/"/g, '');

    navigate('ProjectName', {categories: formatedHobbies});
  };

  return (
    <React.Fragment>
      <DefaultTemplate>
        <View style={styles.container}>
          <Title style={styles.title}>
            Quelle catégorie décrirait le mieux votre projet ?
          </Title>
          <Paragraph style={styles.paragraph}>
            Choisissez au moins deux centres d'intérêt
          </Paragraph>
          <ScrollView style={styles.hobbiesScrollContainer}>
            <View style={styles.hobbiesContainer}>
              {hobbies.map((hobby, index) => {
                const isSelected = selectedHobbies.includes(hobby);

                return isSelected ? (
                  <BlackButton
                    key={index}
                    textStyle={styles.btnText}
                    style={styles.btn}
                    onPress={() => handleSelectHobbie(hobby, 'remove')}>
                    {hobby}
                  </BlackButton>
                ) : (
                  <BlackBorderButton
                    key={index}
                    textStyle={styles.btnText}
                    style={styles.btn}
                    onPress={() => handleSelectHobbie(hobby, 'add')}>
                    {hobby}
                  </BlackBorderButton>
                );
              })}
            </View>
          </ScrollView>

          <InputLineWithSubmitBtn
            onChangeText={text =>
              setCustomHobbie(text.toLowerCase().replace(/,/g, ''))
            }
            value={customHobbie}
            placeholder="Ajouter un centre d'intérêt"
            btnImage={require('../../../../assets/img/icons/add.png')}
            callback={handleAddCustomHobbie}
            isValid={customHobbie.length > 2}
          />
        </View>
      </DefaultTemplate>
      <BlackButton size="large" style={styles.submitBtn} onPress={handleSubmit}>
        Suivant
      </BlackButton>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 50,
  },
  paragraph: {
    opacity: 0.5,
    fontSize: 12,
  },
  hobbiesScrollContainer: {
    minHeight: 100,
    maxHeight: height / 3,
    marginTop: 40,
  },
  hobbiesContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    overflow: 'scroll',
  },
  btn: {
    marginHorizontal: 3,
    marginVertical: 7,
    borderWidth: 1,
    borderColor: '#000',
  },
  btnText: {
    fontSize: 11,
    textTransform: 'capitalize',
  },
  submitBtn: {
    position: 'absolute',
    bottom: 50,
    width: width - 48,
    left: 24,
  },
});
