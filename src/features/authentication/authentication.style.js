import {StyleSheet, Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');
export default styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 150,
    position: 'absolute',
    width: width,

    zIndex: 1,
    marginTop: Platform.OS === 'ios' ? 30 : 0,
  },
  scrollview: {
    marginTop: Platform.OS === 'ios' ? 180 : 100,
  },

  disabled: {
    opacity: 0.3,
  },
  formContainer: {
    marginHorizontal: 24,
  },

  inputDate: {
    borderBottomWidth: 1,
    borderColor: '#ccc',

    paddingBottom: 10,
    marginVertical: 20,
    borderRadius: 0,
    width: '100%',
  },
  inputTextDate: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  inputTextDatePlaceholder: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#B4AEB9',
  },

  submitContainer: {
    marginHorizontal: 24,
    marginTop: 80,
  },

  confirmationContainer: {
    marginTop: 100,
    alignItems: 'center',
  },

  confirmationIcon: {
    marginTop: 40,
    marginBottom: 80,
  },
});
