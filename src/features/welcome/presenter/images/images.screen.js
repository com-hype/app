import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Alert, Dimensions, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BlackButton, Title} from '../../../../components/atoms';
import {DefaultTemplate} from '../../../../components/templates';
import {selectToken, updateUser} from '../../../authentication/user.redux';
import ImageInput from './_components/imageInput';

import {
  sendPresenterRegistration,
  sendProjectImage,
} from '../presenter.services';
import Loading from '../../../../components/templates/loading';

const {width} = Dimensions.get('window');

export default function ProjectImagesScreen({route}) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const projectProps = route.params;

  const handleImage = (image, index) => {
    const newImages = [...images];
    newImages[index] = image;
    setImages(newImages);
  };

  const handleSubmit = async () => {
    const newImages = images.filter(image => image !== null);

    if (newImages.length < 1) {
      Alert.alert('Impossible', 'Veuillez ajouter au moins une image', [
        {text: 'OK'},
      ]);
      return;
    }

    setLoading(true);
    const data = new FormData();

    data.append('title', projectProps.title);
    data.append('description', projectProps.description);
    data.append('name', projectProps.name);
    data.append('categories', projectProps.categories);
    data.append('crowdfunding_goal', projectProps.crowdfunding_goal);
    data.append(
      'crowdfunding_description',
      projectProps.crowdfunding_description,
    );

    if (projectProps.avatar) {
      data.append('avatar', {
        name: projectProps.avatar.filename,
        type: projectProps.avatar.mime,
        uri: projectProps.avatar.path,
      });
    }
    const registration = await sendPresenterRegistration(data, token);

    if (registration.status !== 'done') {
      setLoading(false);
      Alert.alert('Erreur', registration.response, [{text: 'OK'}]);
      return;
    }

    for (const key in images) {
      if (images[key] !== null) {
        const imageData = new FormData();
        imageData.append('image', {
          name: images[key].filename,
          type: images[key].mime,
          uri: images[key].path,
        });
        imageData.append('type', 'project');
        const {status, response, code} = await sendProjectImage(
          imageData,
          token,
        );
        if (status !== 'done') {
          setLoading(false);
          Alert.alert('Erreur', response, [{text: 'OK'}]);
          return;
        }
      }
    }
    setLoading(false);

    await dispatch(updateUser(registration.response.user));
  };

  return (
    <React.Fragment>
      {loading && <Loading />}
      <DefaultTemplate>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Title>Ajoutez des images qui présentent le produit</Title>

            <View style={styles.imageContainer}>
              {images.map((image, index) => (
                <ImageInput
                  key={index}
                  index={index}
                  photo={image}
                  onChange={handleImage}
                />
              ))}
            </View>
          </View>
          <BlackButton size="large" onPress={() => handleSubmit()}>
            Terminer
          </BlackButton>
        </View>
      </DefaultTemplate>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  contentContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    width: width - 40,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
