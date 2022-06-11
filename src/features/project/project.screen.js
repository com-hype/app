import React, {useEffect, useState} from 'react';
import {View, Alert, ScrollView, ImageBackground, Switch} from 'react-native';
import {
  BlackBorderButton,
  BlackButton,
  DescriptionLabel,
  InputLine,
  Paragraph,
  SubTitle,
  Title,
} from '../../components/atoms';
import {DefaultTemplate} from '../../components/templates';
import Loading from '../authentication/_components/loading';
import ImageInput from './_components/imageInput';
import styles from './project.style';
import {sendReplaceProjectImage, sendProjectImage} from './project.services';
import {useSelector} from 'react-redux';
import {selectToken} from '../authentication/user.redux';
import Toast from 'react-native-toast-message';
import {getPersonnalProject} from '../account/account.services';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

export default function ProjectScreen() {
  const token = useSelector(selectToken);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const getProject = async () => {
    const project = await getPersonnalProject(token);
    if (project.status === 'done') {
      setProject(project.response);
    }
  };

  useEffect(() => {
    getProject();
    return () => {
      setProject(null);
    };
  }, []);

  useEffect(() => {
    if (!project) return;
    const tmp = [];
    for (let i = 0; i < 9; i++) {
      tmp.push(project.images[i] ? project.images[i] : null);
    }
    setImages(tmp);
  }, [project]);

  const replaceImage = async (result, index, id) => {
    setLoading(true);
    const imageData = new FormData();
    imageData.append('image', {
      name: result.filename,
      type: result.mime,
      uri: result.path,
    });
    const {status, response} = await sendReplaceProjectImage(
      id,
      imageData,
      token,
    );

    if (status !== 'done') {
      Alert.alert('Erreur', response, [{text: 'OK'}]);
      setLoading(false);
      return;
    }

    const tmp = [...images];
    tmp[index] = response.image;
    setImages(tmp);
    setLoading(false);
    Toast.show({
      type: 'success',
      text1: 'Succès',
      text2: 'Image remplacée avec succès',
    });
  };

  const uploadImage = async (result, index) => {
    setLoading(true);
    const imageData = new FormData();
    imageData.append('image', {
      name: result.filename,
      type: result.mime,
      uri: result.path,
    });
    imageData.append('type', 'project');
    const {status, response} = await sendProjectImage(imageData, token);

    if (status !== 'done') {
      Alert.alert('Erreur', response, [{text: 'OK'}]);
      setLoading(false);
      return;
    }

    const tmp = [...images];
    // get first index of null
    let i = 0;
    while (tmp[i] !== null) {
      i++;
    }
    tmp[i] = response.image;
    setImages(tmp);
    setLoading(false);
    Toast.show({
      type: 'success',
      text1: 'Succès',
      text2: 'Image ajoutée avec succès',
    });
  };

  if (loading || !project) return <Loading />;

  return (
    <ScrollView style={styles.container}>
      <SubTitle>Images de présentation</SubTitle>
      <View style={styles.imageContainer}>
        {images.map((image, index) => {
          return (
            <ImageInput
              photo={image}
              key={index}
              index={index}
              replaceImage={replaceImage}
              uploadImage={uploadImage}
            />
          );
        })}
      </View>
      <SubTitle>Informations</SubTitle>
      <InputLine
        placeholder="Nom du projet"
        value={project.info.name}
        onChangeText={text => {
          setProject({
            ...project,
            info: {...project.info, name: text},
          });
        }}
      />
      <InputLine
        placeholder="Titre (ex: Plateforme de marketing)"
        style={styles.inputTitle}
        value={project.info.title}
        onChangeText={text => {
          if (text.length <= 40)
            setProject({
              ...project,
              info: {...project.info, title: text},
            });
        }}
      />
      <DescriptionLabel style={styles.label}>
        {project.info.title.length}/40
      </DescriptionLabel>
      <InputLine
        multiline={true}
        numberOfLines={4}
        placeholder="Description du projet"
        style={styles.inputDescription}
        value={project.info.description}
        onChangeText={text => {
          if (text.length <= 150)
            setProject({
              ...project,
              info: {...project.info, description: text},
            });
        }}
      />
      <DescriptionLabel style={styles.label}>
        {project.info.description.length}/150
      </DescriptionLabel>

      <SubTitle style={{marginBottom: 15}}>Catégories de projet</SubTitle>
      <BlackButton>Modifier</BlackButton>
      {/* <FontAwesome name="arrow-right" size={16} color="#fff" /> */}

      <SubTitle style={{marginTop: 25}}>Financement participatif</SubTitle>
      <Paragraph style={{textAlign: 'left'}}>
        Le financement participatif est une méthode efficace pour financer votre
        projet.
      </Paragraph>

      <BlackButton style={styles.crowdfundingBtn}>
        {project.info.crowdfunding ? 'Modifier' : 'Configurer maintenant'}
      </BlackButton>
      <View style={styles.footer}>
        <BlackBorderButton style={styles.repportBtn}>
          Signaler un problème
        </BlackBorderButton>
        <BlackButton textStyle={styles.textDeleteBtn} style={styles.deleteBtn}>
          Supprimer le projet
        </BlackButton>
      </View>
    </ScrollView>
  );
}
