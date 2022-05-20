import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  text: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
    textAlign: 'center',
  },
  containerSolid: {
    backgroundColor: '#000',
  },
  textSolid: {
    color: '#fff',
  },

  // size
  small: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  medium: {
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
