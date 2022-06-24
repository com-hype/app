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

import {Title} from '../../components/atoms';
import {DefaultTemplate} from '../../components/templates';
import {selectToken} from '../authentication/user.redux';

import {fetchLikes} from './likes.services';
import Card from './_components/card';

const {height, width} = Dimensions.get('window');

export default function LikesListScreen() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector(selectToken);

  const getLikes = async () => {
    setLoading(true);
    const projectsLiked = await fetchLikes(token);
    if (projectsLiked.status === 'done') {
      setProjects(projectsLiked.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLikes();
  }, []);

  // if (loading) return <Loading />;

  return (
    <>
      <Title style={styles.title}>Projets likés</Title>
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getLikes} />
        }>
        <View style={styles.container}>
          {projects.map(project => (
            <Card
              key={project.info.id}
              project={project.info}
              image={project.images[0]}
            />
          ))}
        </View>
      </ScrollView>
    </>
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
});
