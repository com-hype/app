import React from 'react';
import {View} from 'react-native';
import {Paragraph, Title} from '../../components/atoms';
import {DefaultTemplate} from '../../components/templates';

export default function ProjectDetailsScreen({route}) {
  const {project} = route.params;
  return (
    <DefaultTemplate>
      <View>
        <Title>{project.name}</Title>
        <Paragraph>{project.description}</Paragraph>
      </View>
    </DefaultTemplate>
  );
}
