import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider, createStore } from 'easy-peasy';
import Logger from 'js-logger';
import { storeModel } from './store';
import App from './containers/App';
import GlobalStyle from './globalStyle';
import PDFGenerator from '../common/services/pdf';
import i18n from '../common/i18n';
import { APP_ID } from '../constants';

export default class YiNote {
  #store;

  constructor() {
    this.#store = createStore(storeModel);
    Logger.useDefaults();
    i18n.init();
    PDFGenerator.init();
  }

  get store() {
    return this.#store;
  }

  render() {
    const container = document.createElement('div');
    container.id = APP_ID;
    container.classList.add(APP_ID);
    document.body.appendChild(container);

    ReactDOM.render(
      <StoreProvider store={this.#store}>
        <MemoryRouter>
          <GlobalStyle />
          <App />
        </MemoryRouter>
      </StoreProvider>,
      container
    );
  }

  destroy() {
    const yinoteEl = document.getElementById(APP_ID);
    if (yinoteEl) {
      yinoteEl.parentNode.removeChild(yinoteEl);
    }
  }
}
