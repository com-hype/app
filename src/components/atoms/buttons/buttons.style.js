import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  containerChecked: {
    paddingHorizontal: 25,
    borderRadius: 999,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textChecked: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
    textAlign: 'left',
  },
  checkedCircle: {
    width: 25,
    height: 25,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCheckedCircle: {
    width: 25,
    height: 25,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
    textAlign: 'center',
  },
  containerSolid: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
  },
  textSolid: {
    color: '#fff',
  },
  containerSolid: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
  },
  textSolid: {
    color: '#fff',
  },

  containerBorder: {
    borderWidth: 1,
    borderColor: '#000',
  },
  textBorder: {
    color: '#000',
  },

  disabled: {
    opacity: 0.5,
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

  // size
  textsmall: {
    fontSize: 12,
  },
  textmedium: {
    fontSize: 12,
  },
  textlarge: {
    fontSize: 14,
  },
});
