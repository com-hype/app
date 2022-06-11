import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default styles = StyleSheet.create({
  globalContainer: {
    width: width,
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  porfilContainer: {
    marginVertical: 20,
    alignItems: 'flex-start',
    marginTop: 20,
    flexDirection: 'row',
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#D5D5D5',
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profilRightContainer: {
    marginLeft: 20,
  },
  profilTitle: {
    fontSize: 25,
    fontFamily: 'Montserrat-SemiBold',
    textTransform: 'capitalize',
    color: '#fff',
  },
  profilSubTitle: {
    marginTop: -10,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
  profilBtn: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: '#fff',
  },

  profilBtnText: {
    color: '#fff',
  },

  cardContainer: {
    marginHorizontal: 24,
    marginTop: 20,
  },
  projectContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  projectTitle: {
    fontSize: 20,
    textTransform: 'capitalize',
    textAlign: 'left',
    marginBottom: 0,
  },

  cardText: {
    marginLeft: 30,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  headerTitle: {
    marginTop: 0,
    color: '#fff',
  },

  logoutbtn: {
    marginBottom: 8,
  },
});
