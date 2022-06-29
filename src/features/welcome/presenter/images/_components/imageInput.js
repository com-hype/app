import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const {width} = Dimensions.get('window');

export default function ImageInput({
  photo = null,
  onChange = () => {},
  index = 0,
}) {
  const handleChoosePhoto = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        includeBase64: true,
      });

      if (result.path) {
        onChange(result, index);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleChoosePhoto()}
      style={styles.imageBtn}>
      <ImageBackground
        resizeMode="cover"
        style={styles.imageContainer}
        source={{
          uri: photo ? `data:${photo.mime};base64,${photo.data}` : null,
        }}>
        {photo && <View style={styles.backgroundIcon} />}
        <Image
          source={
            photo
              ? require('../../../../../assets/img/icons/edit.png')
              : require('../../../../../assets/img/icons/add-image.png')
          }
        />
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageBtn: {
    marginTop: 20,
  },
  imageContainer: {
    height: 114,
    width: width / 3 - 25,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C7C4C4',
  },
  backgroundIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  imageLabel: {
    color: '#000',
    marginTop: 5,
  },
});
