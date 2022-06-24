import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  PlatformColor,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import {
  BlackBorderButton,
  BlackButton,
  Paragraph,
  Title,
} from '../../../components/atoms';
import FeatureInput from './_components/feature-input';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../theme/colors';
import {fetchFeatures, sendFeatures} from '../project.services';
import {useSelector} from 'react-redux';
import {selectToken} from '../../authentication/user.redux';
import Toast from 'react-native-toast-message';
import Loading from '../../../components/templates/loading';

const {height, width} = Dimensions.get('window');

export default function ProjectFeaturesScreen({route, navigation}) {
  const {project} = route.params;

  const token = useSelector(selectToken);
  const [featuresList, setFeaturesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setFeaturesList([...featuresList, {name: '', description: ''}]);
  };

  const handleChange = (value, index, type) => {
    const newFeaturesList = [...featuresList];
    newFeaturesList[index][type] = value;
    setFeaturesList(newFeaturesList);
  };

  const handleDelete = index => {
    const newFeaturesList = [...featuresList];
    newFeaturesList.splice(index, 1);
    setFeaturesList(newFeaturesList);
  };

  const handleSubmit = async () => {
    navigation.goBack();
    const featuresRes = await sendFeatures(project.id, featuresList, token);
    if (featuresRes.status === 'error') {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: featuresRes.response,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Succès',
        text2: 'Les modifications ont été enregistrées',
      });
    }
  };

  const getFeatures = async () => {
    setLoading(true);
    const featuresRes = await fetchFeatures(project.id, token);
    if (featuresRes.status === 'error') {
      navigation.goBack();
      return;
    }
    setFeaturesList(featuresRes.response);
    setLoading(false);
  };

  useEffect(() => {
    getFeatures();
  }, []);

  if (loading) return <Loading />;

  return (
    <View>
      <ScrollView style={styles.container}>
        <BlackBorderButton
          size="large"
          onPress={handleAdd}
          style={{borderRadius: 5, marginBottom: 20}}>
          Ajouter une fonctionnalité
        </BlackBorderButton>
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
        <View style={{height: 150}} />
      </ScrollView>
      <BlackButton size="large" style={styles.btn} onPress={handleSubmit}>
        Sauvegarder
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
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
