/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import {name as appName} from './app.json';
import store from './src/store/store';

const storeData = store();

const RNRedux = () => (
    <Provider store={storeData}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
