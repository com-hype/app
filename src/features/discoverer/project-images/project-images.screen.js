import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  LogBox,
  Platform,
  Image,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {SliderBox} from 'react-native-image-slider-box';
import colors from '../../../theme/colors';

const {height, width} = Dimensions.get('window');
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

export default function ProjectImagesScreen({route}) {
  const {images, position} = route.params;
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(position);

  const _renderItem = ({item, index}) => {
    return (
      <Image
        key={index}
        source={{
          uri: item.url,
        }}
        style={{width: width, height: width}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}>
        <Image source={require('../../../assets/img/icons/arrow-left.png')} />
        <Text style={styles.back}>Retour</Text>
      </TouchableOpacity>
      <View style={styles.sliderContainer}>
        <Carousel
          firstItem={position}
          data={images}
          renderItem={_renderItem}
          sliderWidth={width}
          sliderHeight={width}
          itemWidth={width}
          layout={'default'}
          onSnapToItem={index => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
          dotStyle={{
            width: 15,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotStyle={{
            width: 10,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    height: height,
    width: width,
  },
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 10,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
  sliderContainer: {
    height: height / 2,
    width: width,
    justifyContent: 'center',
  },
});
