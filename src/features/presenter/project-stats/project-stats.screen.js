import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
  processColor,
} from 'react-native';
import Share from 'react-native-share';

const {width} = Dimensions.get('window');
// import {BarChart, LineChart} from 'react-native-chart-kit';
import {BarChart} from 'react-native-charts-wrapper';

import ViewShot, {captureRef} from 'react-native-view-shot';
import {useSelector} from 'react-redux';
import colors from '../../../theme/colors';
import {selectToken} from '../../authentication/user.redux';

import {fetchStats} from '../../project/project.services';
import Header from './_components/header';
import Loading from '../../../components/templates/loading';
import AnimatedLottieView from 'lottie-react-native';

const CHARTCOLOR = processColor(colors.primary);
export default function ProjectStatsScreen() {
  const {width} = Dimensions.get('window');
  const token = useSelector(selectToken);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('day');

  // create a ref
  const viewRef = useRef();

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  const shareImage = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      const uri = await viewRef.current.capture();

      // share
      const shareResponse = await Share.open({url: uri});
    } catch (error) {
      console.log('error', error);
    }
  };

  const getStats = async () => {
    setLoading(true);
    const stats = await fetchStats(token);
    if (stats.status === 'done') {
      setStats(stats.response);
    } else {
      Alert.alert('Erreur', stats.response, [{text: 'OK'}]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getStats();
    return () => {
      setStats(null);
    };
  }, []);

  const getLabels = () => {
    if (type === 'day') {
      return stats.likes.day.labels;
    } else if (type === 'week') {
      return stats.likes.week.labels;
    } else if (type === 'month') {
      return stats.likes.month.labels;
    }
  };

  const getValues = () => {
    if (type === 'day') {
      return stats.likes.day.data;
    } else if (type === 'week') {
      return stats.likes.week.data;
    } else if (type === 'month') {
      return stats.likes.month.data;
    }
  };

  if (loading) return <Loading />;
  if (!stats) return null;

  return (
    <View style={styles.container}>
      <Header
        type={type}
        changeType={type => setType(type)}
        onShare={shareImage}
      />

      <ViewShot
        ref={viewRef}
        style={styles.statsContainer}
        options={{
          fileName: `statistiques_${Date.now()}`,
          format: 'png',
          quality: 1,
        }}>
        <View style={styles.chartContainer}>
          <BarChart
            style={styles.chart}
            chartDescription={{text: ''}}
            legend={{enabled: false}}
            xAxis={{
              drawGridLines: false,
              position: 'BOTTOM',
              valueFormatter: getLabels(),
              granularityEnabled: true,
              granularity: 1,
            }}
            yAxis={{
              left: {
                drawGridLines: false,
              },
              right: {
                enabled: false,
              },
            }}
            data={{
              dataSets: [
                {
                  values: getValues(),
                  label: 'Zero line dataset',
                  config: {
                    colors: [CHARTCOLOR],
                  },
                },
              ],
            }}
          />
        </View>
        <View style={styles.card}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Impressions totales</Text>
            <Text style={styles.cardSubTitle}>{stats.prints}</Text>
          </View>
          <View style={styles.cardMiddleTextContainer}>
            <Text style={styles.cardTitle}>Mentions "J'aime"</Text>
            <Text style={styles.cardSubTitle}>{stats.likes.total}</Text>
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Fonds récoltés</Text>
            <Text style={styles.cardSubTitle}>{stats.amount} €</Text>
          </View>
        </View>
      </ViewShot>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  statsContainer: {
    width: width,
    paddingBottom: 24,
  },
  chartContainer: {
    backgroundColor: '#fff',
    marginVertical: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 24,
    padding: 10,
  },
  chart: {
    height: 220,
  },
  card: {
    width: width - 24,
    marginTop: 20,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: '#352641',
  },
  cardSubTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
    color: '#352641',
  },
  cardTextContainer: {
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  cardMiddleTextContainer: {
    height: 80,
    backgroundColor: '#E7EAF7',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});
