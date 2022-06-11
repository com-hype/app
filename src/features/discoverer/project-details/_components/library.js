import React from 'react';
import {View, ScrollView, StyleSheet, Dimensions, Image} from 'react-native';
import {SubTitle, Title} from '../../../../components/atoms';

const {height} = Dimensions.get('window');
export default function Library({images = []}) {
  return (
    <View style={styles.container}>
      <SubTitle>GALERIE</SubTitle>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrolContainer}>
          {images.map(image => (
            <Image
              key={image.id}
              source={{uri: image.url}}
              style={styles.image}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    height: 230,
  },
  scrolContainer: {
    marginTop: 25,
    marginLeft: 24,
  },
  image: {
    width: 160,
    height: 180,
    borderRadius: 30,
    marginHorizontal: 5,
  },
});
