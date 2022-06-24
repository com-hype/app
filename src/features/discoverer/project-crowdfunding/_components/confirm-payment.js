import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, Modal, Image} from 'react-native';
import {BlackButton, SubTitle, Title} from '../../../../components/atoms';
import AnimatedLottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

export default function ConfirmPayment({
  onClose = () => {},
  isOpen = false,
  name = '',
}) {
  const [isRender, setIsRender] = React.useState(false);

  useEffect(() => {
    setIsRender(true);
  }, []);

  if (!isOpen) return null;
  return (
    <View
      style={styles.container}
      onPress={() => {
        onClose();
      }}>
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={onClose}>
        <View style={styles.modalView}>
          <Image source={require('../../../../assets/img/icons/success.png')} />
          <Title>Succès!</Title>
          <SubTitle style={styles.subTitle}>
            Merci d'avoir supporté {name} !
          </SubTitle>

          <BlackButton size="large" onPress={() => onClose()}>
            Fermer
          </BlackButton>
        </View>
      </Modal>
      {isRender && (
        <AnimatedLottieView
          autoPlay
          loop={true}
          source={require('../../../../assets/anim/confirm-payment.json')}
          style={styles.animation}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: width,
    height: height,
    transform: [{scale: 1.5}],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginTop: height / 2 - 200,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    position: 'absolute',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width - 40,
  },
  subTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
});
