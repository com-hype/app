import {transform} from '@babel/core';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchProjects, sendLike} from './projects.services';
import {useSelector} from 'react-redux';
import {selectToken} from '../authentication/user.redux';
import {useNavigation} from '@react-navigation/native';
import Projects from './_components/project';
import NoProjects from './noProjects';

const {height} = Dimensions.get('window');

function StatusCard({text}) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

export default function ProjectsScreen() {
  const {navigate} = useNavigation();
  const [projects, setProjects] = useState(null);
  const [currentProject, setCurrentProject] = useState({
    info: {
      id: 0,
      name: '',
      title: '',
      description: '',
      avatar: 'https://picsum.photos/80',
    },
    images: [],
  });
  const token = useSelector(selectToken);

  const getProjects = async () => {
    const projects = await fetchProjects(token);
    if (projects.status === 'done') {
      setProjects(projects.response);
      if (projects.response.length) {
        setCurrentProject(projects.response[0]);
      }
    }
  };

  useEffect(() => {
    getProjects();
    return () => {
      setProjects([]);
    };
  }, []);

  const changeCurrentProject = project => {
    setCurrentProject(project);
  };

  const handleSwipe = (id, action) => {
    sendLike(id, action, token);
  };

  return (
    <React.Fragment>
      <View style={styles.background}></View>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle="light-content"
        />
        {projects ? (
          <React.Fragment>
            {!currentProject && <NoProjects refresh={getProjects} />}
            <Projects
              projects={projects}
              currentProject={currentProject}
              changeProject={changeCurrentProject}
              onSwipe={handleSwipe}
            />
          </React.Fragment>
        ) : (
          <StatusCard text="Loading..." />
        )}
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  background: {
    height: height / 2,
    width: '100%',
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
