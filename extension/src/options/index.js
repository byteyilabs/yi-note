import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { StoreProvider, createStore } from 'easy-peasy';
import { storeModel } from './store';
import App from './containers/App';
import i18n from '../common/i18n';
import PDFGenerator from '../common/services/pdf';
import GlobalStyle from './globalStyle';
import { APP_ID } from '../constants';

i18n.init();
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
