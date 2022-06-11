import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BlackButton, Title} from '../../components/atoms';
import {DefaultTemplate} from '../../components/templates';
import {logout, selectToken, selectUser} from '../authentication/user.redux';
import ProfilCard from './_components/profil';
import Card from './_components/card';
import {getPersonnalProject} from './account.services';
import styles from './account.style';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
export default function AccountScreen() {
  const [project, setProject] = useState(null);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

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

  return (
    <React.Fragment>
      <View style={styles.globalContainer}>
        <View style={styles.headerContainer}>
          <Title style={styles.headerTitle}>Mon compte</Title>
          <TouchableOpacity
            onPress={() => dispatch(logout())}
            style={styles.logoutbtn}>
            <FontAwesome name="sign-out-alt" size={25} color="grey" solid />
          </TouchableOpacity>
        </View>
        <ProfilCard user={user} />
      </View>

      <View style={styles.cardContainer}>
        {user.type === 'presenter' && project && (
          <Card
            iconName="briefcase"
            title={project.info.name}
            subTitle="Modifiez votre projet"
            backgroundColor="#5F5BD9"
            textColor="white"
            onPress={() => navigate('Paramètres du projet', {data: project})}
          />
        )}
        <Card
          title="Centre d'intérêt"
          backgroundColor="#67B749"
          textColor="white"
          subTitle="Modifiez votre centre d'intérêt"
        />
        <Card
          iconName="shield-alt"
          title="sécurité"
          textColor="#141334"
          subTitle="Modifier vos informations"
        />
      </View>
    </React.Fragment>
  );
}
