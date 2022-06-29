import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';

import {Paragraph, Title} from '../../components/atoms';
import {DefaultTemplate, ScrollTemplate} from '../../components/templates';
import {selectToken} from '../authentication/user.redux';

import {fetchLikes} from './likes.services';
import Card from './_components/card';

const {height, width} = Dimensions.get('window');

export default function LikesListScreen() {
  const [projects, setProjects] = useState([]);

  const token = useSelector(selectToken);

  const getLikes = async () => {
    const projectsLiked = await fetchLikes(token);
    if (projectsLiked.status === 'done') {
      setProjects(projectsLiked.response);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <ScrollTemplate title="Projets likés" onRefresh={getLikes}>
      <View style={styles.container}>
        {projects.length ? (
          projects.map(project => (
            <Card
              key={project.info.id}
              project={project.info}
              image={project.images[0]}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Paragraph>Vous n'avez pas encore liké de projets.</Paragraph>
          </View>
        )}
      </View>
    </ScrollTemplate>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: 24,
    height: height,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height - 300,
  },
});
