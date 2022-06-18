import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Paragraph, SubTitle} from '../../../../components/atoms';
const {width} = Dimensions.get('window');

export default function Description({description = '', categories = []}) {
  return (
    <View>
      <SubTitle style={styles.subTitle}>Description</SubTitle>
      <Paragraph style={styles.paragraph}>{description}</Paragraph>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <Text key={index} style={styles.category}>
            {category.name}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  paragraph: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    marginTop: 5,
    marginHorizontal: 24,
  },
  categoriesContainer: {
    marginHorizontal: 24,
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 48,
    justifyContent: 'center',
  },
  category: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    borderWidth: 1,
    margin: 3,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    textTransform: 'capitalize',
  },
});
