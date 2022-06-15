import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {BlackButton, Title} from '../../../../components/atoms';
import colors from '../../../../theme/colors';

const {width} = Dimensions.get('window');
export default function Header({type = 'day', changeType = () => {}}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerBtnContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../../../assets/img/icons/arrow-left.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../../../assets/img/icons/share.png')} />
        </TouchableOpacity>
      </View>
      <Title style={styles.title}>Statistiques</Title>
      <Text>Header</Text>
      <View size="small" style={styles.typeBtnContainer}>
        <BlackButton
          style={type === 'day' && styles.btnTypeSelected}
          onPress={() => changeType('day')}>
          Aujourd'hui
        </BlackButton>
        <BlackButton
          style={type === 'week' && styles.btnTypeSelected}
          onPress={() => changeType('week')}>
          Semaine
        </BlackButton>
        <BlackButton
          style={type === 'month' && styles.btnTypeSelected}
          onPress={() => changeType('month')}>
          Mois
        </BlackButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: width,
    borderBottomLeftRadius: 50,
  },
  headerBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
  title: {
    color: '#fff',
    textAlign: 'left',
    marginLeft: 50,
    marginBottom: 0,
  },
  typeBtnContainer: {
    marginLeft: 50,
    marginRight: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  btnTypeSelected: {
    backgroundColor: colors.primary,
  },
});
