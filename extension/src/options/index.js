import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { StoreProvider, createStore } from 'easy-peasy';
import Logger from 'js-logger';
import { i18n } from '@yi-note/common';
import PDFGenerator from '@yi-note/common/services/pdf';
import { APP_ID } from '@yi-note/common/constants';
import { storeModel } from './store';
import App from './containers/App';
import GlobalStyle from './globalStyle';

i18n.init();
Logger.useDefaults();

const store = createStore(storeModel);

PDFGenerator.init();

const container = document.createElement('div');
container.id = APP_ID;
container.classList.add(APP_ID);
document.body.appendChild(container);

ReactDOM.render(
  <StoreProvider store={store}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </StoreProvider>,
  container
);
