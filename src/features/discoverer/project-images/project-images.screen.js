import {useNavigation} from '@react-navigation/native';
import React from 'react';
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
import {SliderBox} from 'react-native-image-slider-box';
import colors from '../../../theme/colors';

const {height, width} = Dimensions.get('window');
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

export default function ProjectImagesScreen({route}) {
  const navigation = useNavigation();
  const {images, position} = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}>
        <Image source={require('../../../assets/img/icons/arrow-left.png')} />
        <Text style={styles.back}>Retour</Text>
      </TouchableOpacity>
      <View style={styles.sliderContainer}>
        <SliderBox
          firstItem={position}
          images={images}
          dotColor={colors.primary}
          sliderBoxHeight={500}
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
