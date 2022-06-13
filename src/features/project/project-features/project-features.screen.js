import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  PlatformColor,
} from 'react-native';
import {BlackButton, Paragraph, Title} from '../../../components/atoms';
import FeatureInput from './_components/feature-input';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../theme/colors';

const {height, width} = Dimensions.get('window');

export default function ProjectFeaturesScreen({route, navigation}) {
  const {features} = route.params;
  const [featuresList, setFeaturesList] = useState([...features]);

  const handleChange = (value, index, type) => {
    const tmp = [...featuresList];
    tmp[index][type] = value;
    setFeaturesList(tmp);
  };

  const handleDelete = index => {
    const tmp = [...featuresList];
    tmp.splice(index, 1);
    setFeaturesList(tmp);
  };

  const handleSubmit = async () => {
    console.log('featuresList -> ', featuresList);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit}>
          <FontAwesome
            name="save"
            size={25}
            color={PlatformColor('link')}
            solid
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <ScrollView style={styles.container}>
        {featuresList.map((feature, index) => (
          <FeatureInput
            key={index}
            index={index}
            name={feature.name}
            description={feature.description}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        ))}
      </ScrollView>
      <BlackButton
        size="large"
        style={styles.btn}
        onPress={() => {
          setFeaturesList([...featuresList, {name: '', description: ''}]);
        }}>
        Ajouter une fonctionnalité
      </BlackButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    height: height - 240,
    marginHorizontal: 20,
    overflow: 'visible',
  },
  btn: {
    marginHorizontal: 24,
  },
});
