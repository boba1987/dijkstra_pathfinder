/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

import AppBar from 'material-ui/AppBar';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const response = require('../response.json');

window.response = response;

render(
  <MuiThemeProvider>
    <AppContainer>
      <div>
        <AppBar
          title={'Trip Sorter'}
          showMenuIconButton={false}
          style={{position: 'fixed', top: 0, left: 0, width: '100%'}}
        />
        <Root store={store} history={history} />
      </div>
    </AppContainer>
  </MuiThemeProvider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
          <NewRoot store={store} history={history} />
      </AppContainer>
      ,
      document.getElementById('app')
    );
  });
}
