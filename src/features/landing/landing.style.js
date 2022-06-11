import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  logo: {
    marginTop: 0,
  },
  subTitle: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    paddingHorizontal: 60,
    paddingTop: 50,
    paddingBottom: 40,
  },

  loginContainer: {
    width: width,
    borderTopLeftRadius: 80,
    overflow: 'hidden',
  },
  login: {
    backgroundColor: '#DBDBDB',
    paddingVertical: 30,
    justifyContent: 'flex-start',
    width: '100%',
    height: 180,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
    textAlign: 'center',
  },

  registerContainer: {
    width: width,
    borderTopLeftRadius: 80,
    overflow: 'hidden',
    position: 'absolute',
  },
  register: {
    backgroundColor: '#000',
    paddingVertical: 30,
    justifyContent: 'flex-start',
    height: 100,
    width: '100%',
  },
  registerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
});
export default styles;
