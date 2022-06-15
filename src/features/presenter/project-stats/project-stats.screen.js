import React, {useState} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
import {LineChart} from 'react-native-chart-kit';
import colors from '../../../theme/colors';
import Header from './_components/header';
export default function ProjectStatsScreen() {
  const [type, setType] = useState('day');

  const getLabels = () => {
    if (type === 'week') {
      return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    } else if (type === 'month') {
      return ['Fev', 'Avr', 'Juin', 'Aou', 'Oct', 'Dec'];
    } else if (type === 'day') {
      return ['00h', '04h', '08h', '12h', '16h', '20h', '24h'];
    }
  };

  return (
    <View style={styles.container}>
      <Header type={type} changeType={type => setType(type)} />
      <LineChart
        data={{
          labels: getLabels(),
          datasets: [
            {
              data: [
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
              ],
            },
          ],
        }}
        width={width - 48}
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: colors.primary,
          backgroundGradientFrom: colors.primary,
          backgroundGradientTo: colors.primaryDark,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: colors.primary,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 16,
  },
});
