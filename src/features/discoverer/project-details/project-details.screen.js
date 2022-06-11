import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import {
  BlackButton,
  Paragraph,
  SubTitle,
  Title,
} from '../../../components/atoms';
import {DefaultTemplate} from '../../../components/templates';
import Header from './_components/header';
import Library from './_components/library';

const {width} = Dimensions.get('window');

export default function ProjectDetailsScreen({route}) {
  const {info, images} = route.params.project;
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header image={images[0]} name={info.name} avatar={info.avatar} />
        <Library images={images} />
      </ScrollView>
      <BlackButton
        size="large"
        style={styles.crowdfundingBtn}
        onPress={() =>
          navigate('ProjectCrowfunding', {
            project: route.params.project,
          })
        }>
        Supporter le projet
      </BlackButton>
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
});
