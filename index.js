import {AppRegistry} from 'react-native';

import app from './src/core/app';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => app);
