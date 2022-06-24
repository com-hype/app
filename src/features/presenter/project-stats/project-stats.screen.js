import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Share from 'react-native-share';

const {width} = Dimensions.get('window');
import {LineChart} from 'react-native-chart-kit';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {useSelector} from 'react-redux';
import colors from '../../../theme/colors';
import {selectToken} from '../../authentication/user.redux';

import {fetchStats} from '../../project/project.services';
import Header from './_components/header';
import Loading from '../../../components/templates/loading';
import AnimatedLottieView from 'lottie-react-native';

export default function ProjectStatsScreen() {
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

      // capture component
      // const uri = await captureRef(viewRef, {
      //   format: 'png',
      //   quality: 0.8,
      // });

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
    if (type === 'week') {
      const keys = Object.keys(stats.likes.byWeek);
      const labels = keys
        .map(key => {
          return key.substring(0, 3);
        })
        .reverse();
      return labels;
    } else if (type === 'month') {
      const keys = Object.keys(stats.likes.byMonth);
      const labels = keys
        .map(key => {
          return key;
        })
        .reverse();
      return labels;
    } else if (type === 'day') {
      const keys = Object.keys(stats.likes.byHour);
      const labels = keys
        .map(key => {
          return key + 'h';
        })
        .reverse();
      return labels;
    }
  };

  const getValues = () => {
    const values = Object.values(stats.likes.byWeek)
      .map(value => {
        // console.log(value);
      })
      .reverse();
    return [
      Math.random() * (100 - 0) + 0,
      Math.random() * (100 - 0) + 0,
      Math.random() * (100 - 0) + 0,
      Math.random() * (100 - 0) + 0,
      Math.random() * (100 - 0) + 0,
    ];
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
        <LineChart
          data={{
            labels: getLabels(),
            datasets: [
              {
                data: getValues(),
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
    paddingLeft: 24,
    paddingBottom: 24,
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
    paddingTop: 16,
  },
  card: {
    width: width - 24,
    marginTop: 20,
    marginLeft: -24,
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
