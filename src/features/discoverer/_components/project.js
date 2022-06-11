import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Platform,
  Dimensions,
} from 'react-native';
import {BlackButton, Paragraph, Title} from '../../../components/atoms';
import ProjectCard from './projectCard';
import SwipeCards from './swipeSystem/SwipeCards';

const {height, width} = Dimensions.get('window');

export default function Projects({
  projects = [],
  currentProject = {},
  changeProject = () => {},
  onSwipe = () => {},
}) {
  const {navigate} = useNavigation();

  function handleYup(project) {
    onSwipe(project.info.id, 'like');
    return true;
  }
  function handleNope(project) {
    onSwipe(project.info.id, 'dislike');
    return true;
  }

  return (
    <View
      style={[
        styles.projectContainer,
        !currentProject.info ? {transform: [{scale: 0}]} : null,
      ]}>
      <Title style={styles.name} numberOfLines={1} ellipsizeMode="head">
        {currentProject.info && currentProject.info.name}
      </Title>
      <SwipeCards
        onPressIn={() => setScrollEnabled(false)}
        onPressOut={() => setScrollEnabled(true)}
        cards={projects}
        renderCard={project => (
          <ProjectCard
            key={project.info.id}
            data={project}
            isCurrent={currentProject === project}
          />
        )}
        keyExtractor={project => {
          return String(project.info.id);
        }}
        renderNoMoreCards={() => (
          <ProjectCard
            data={{text: 'Plus aucun projet', backgroundColor: '#E8E4E4'}}
            index={0}
            isCurrent={true}
          />
        )}
        smoothTransition={true}
        stack={true}
        stackDepth={3}
        stackOffsetX={0}
        stackOffsetY={-15}
        hasMaybeAction={false}
        actions={{
          nope: {
            onAction: handleNope,
          },
          yup: {
            onAction: handleYup,
          },
        }}
        currentCard={card => {
          changeProject(projects[card]);
        }}
      />
      <ImageBackground
        style={styles.logo}
        source={{
          uri: currentProject.info && currentProject.info.avatar,
        }}></ImageBackground>
      <Paragraph style={styles.title} numberOfLines={1} ellipsizeMode="head">
        {currentProject.info && currentProject.info.title}
      </Paragraph>
      <Paragraph
        style={styles.description}
        numberOfLines={3}
        ellipsizeMode="head">
        {currentProject.info && currentProject.info.description}
      </Paragraph>
      <BlackButton
        size="large"
        textStyle={styles.btnText}
        onPress={() => navigate('ProjectDetails', {project: currentProject})}
        style={styles.btn}>
        Voir le détail
      </BlackButton>
    </View>
  );
}

const styles = StyleSheet.create({
  projectContainer: {
    alignItems: 'center',
    maxHeight: height - 100,
    paddingHorizontal: 24,
    height: Platform.OS === 'ios' ? height - 150 : height - 50,
  },
  name: {
    color: '#fff',
    marginBottom: 20,
  },
  logo: {
    height: 78,
    width: 78,
    borderRadius: 40,
    backgroundColor: '#000',
    marginTop: 20,
    overflow: 'hidden',
  },
  title: {
    color: '#767676',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textTransform: 'uppercase',
    marginTop: 40,
  },
  description: {
    color: '#767676',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  btn: {
    width: width - 48,
    position: 'absolute',
    bottom: 0,
  },
  btnText: {
    fontSize: 14,
  },
});
