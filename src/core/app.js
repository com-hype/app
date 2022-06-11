import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import configurePersistedStore from './app.store';

import RootContainer from '../navigations';

const {store, persistor} = configurePersistedStore();
const app = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootContainer />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default app;
