import React from 'react';
import {View, Text} from 'react-native';
import Header from '../project-details/_components/header';

export default function ProjectCrowfundingScreen({route}) {
  const {info, images, crowdfunding} = route.params.project;

  return (
    <View>
      <Header image={info.images[0]} name={info.name} avatar={info.avatar} />
    </View>
  );
}
