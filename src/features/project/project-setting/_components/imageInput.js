import React, {useEffect} from 'react';
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

export const ImageInput = ({
  photo = null,
  replaceImage = () => {},
  uploadImage = () => {},
  index = 0,
}) => {
  useEffect(() => {
    console.log('photo -> ', photo);
  }, []);

  const handleChoosePhoto = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        includeBase64: true,
      });

      if (result.path) {
        // if the current input contain a uploaded image, we replace it
        if (photo && photo.url) {
          replaceImage(result, index, photo.id);
        } else {
          uploadImage(result, index);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  function getImage() {
    if (!photo) return null;
    if (photo.data) {
      return `data:${photo.mime};base64,${photo.data}`;
    } else if (photo.url) {
      return photo.url;
    } else {
      return null;
    }
  }

  return (
    <TouchableOpacity
      onPress={() => handleChoosePhoto()}
      style={styles.imageBtn}>
      <ImageBackground
        resizeMode="cover"
        style={styles.imageContainer}
        source={{
          uri: getImage(),
        }}>
        {photo && <View style={styles.backgroundIcon} />}
        <Image
          source={
            photo
              ? require('../../../../assets/img/icons/edit.png')
              : require('../../../../assets/img/icons/add-image.png')
          }
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBtn: {
    marginTop: 15,
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

export default ImageInput;
