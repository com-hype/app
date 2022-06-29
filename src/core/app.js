import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import configurePersistedStore from './app.store';

import RootContainer from '../navigations';
import {View} from 'react-native';
import {DefaultTheme} from '@react-navigation/native';
import {HideTabBar} from './app.context';

const {store, persistor} = configurePersistedStore();

const app = () => {
  const [hideTabBar, setHideTabBar] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: DefaultTheme.colors.background,
      }}>
      <Provider store={store}>
        <HideTabBar.Provider
          value={{
            status: hideTabBar,
            setStatus: value => {
              setTimeout(() => {
                setHideTabBar(value);
              }, 500);
            },
          }}>
          <PersistGate loading={null} persistor={persistor}>
            <RootContainer />
            <Toast />
          </PersistGate>
        </HideTabBar.Provider>
      </Provider>
    </View>
  );
};

export default app;
