import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {
  BackButton,
  BlackButton,
  Paragraph,
  SubTitle,
  Title,
} from '../../../components/atoms';
import {DefaultTemplate} from '../../../components/templates';
import {getPersonnalProject} from '../../account/account.services';
import {selectToken} from '../../authentication/user.redux';
import Loading from '../../../components/templates/loading';
import {fetchProjectById} from '../projects.services';
import Description from './_components/description';
import Features from './_components/features';
import FundingBar from './_components/fundingBar';
import Header from './_components/header';
import Library from './_components/library';

const {width} = Dimensions.get('window');

export default function ProjectDetailsScreen({navigation, route}) {
  const info = route.params?.project?.info;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMyProject, setIsMyProject] = useState(false);
  const {navigate} = useNavigation();
  const token = useSelector(selectToken);

  const getProject = async () => {
    setLoading(true);
    const project = await fetchProjectById(info?.id, token);
    if (project.status === 'done') {
      setProject(project.response);
      setLoading(false);
    } else {
      navigate('Home');
    }
  };

  const getMyProject = async () => {
    setLoading(true);
    const project = await getPersonnalProject(token);
    if (project.status === 'done') {
      setIsMyProject(true);
      setProject(project.response);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (info?.id) getProject();
      else getMyProject();
    });

    return () => {
      setProject(null);
      setLoading(false);
      unsubscribe;
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <ScrollView>
        <BackButton hiddenText />
        <Header
          author={project.author}
          image={project.images[0]}
          name={project.info.name}
          avatar={project.info.avatar}
          isMyProject={isMyProject}
          token={token}
        />
        <FundingBar crowdfunding={project.crowdfunding} />
        <Description
          description={project.info.description}
          categories={project.categories}
        />
        <Library images={project.images} />
        <Features features={project.features} />
        <View style={styles.spacer} />
      </ScrollView>
      {!isMyProject && (
        <BlackButton
          size="large"
          style={styles.crowdfundingBtn}
          onPress={() =>
            navigate('ProjectCrowfunding', {
              project: project,
            })
          }>
          Supporter le projet
        </BlackButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  crowdfundingBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginHorizontal: 24,
    marginBottom: 50,
    width: width - 48,
  },
  spacer: {
    height: 200,
  },
});
