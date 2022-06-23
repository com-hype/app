import React from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  RefreshControl,
  View,
} from 'react-native';
import {Title} from '../atoms';

export function ScrollTemplate({
  children,
  title = '',
  style = {},
  onRefresh = () => {},
  ...props
}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <React.Fragment>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>{title}</Title>
      </View>
      <ScrollView
        style={[styles.container, style]}
        {...props}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {children}
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#000',
    borderBottomLeftRadius: 60,
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 120 : 100,
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    color: '#fff',
  },
  container: {
    marginTop: 20,
    flex: 1,
    marginHorizontal: 24,
  },
});
