import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  username: {
    marginLeft: 10,
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
  },
  messageText: {
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 20,
  },
});
