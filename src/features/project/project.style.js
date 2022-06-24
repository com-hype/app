import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../theme/colors';
const {width} = Dimensions.get('window');

export default styles = StyleSheet.create({
  btnPreview: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  imageContainer: {
    width: width - 48,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    marginTop: -15,
    width: width - 60,
    textAlign: 'right',
    color: '#000',
  },

  inputTitle: {
    marginTop: 5,
  },
  inputDescription: {
    marginTop: 0,
  },

  btnEdit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crowdfundingBtn: {
    backgroundColor: colors.primary,
    borderColor: '#5F5BD9',
  },
  deleteBtn: {
    backgroundColor: '#E56161',
    borderColor: '#E56161',
    marginBottom: 20,
  },
  textDeleteBtn: {
    color: '#fff',
  },
  repportBtn: {
    marginBottom: 20,
  },
  footer: {
    marginTop: 50,
    borderTopColor: '#D5D5D5',
    borderTopWidth: 1,
    justifyContent: 'flex-end',
    width: width - 48,
    height: 200,
    resizeMode: 'cover',
  },
});
