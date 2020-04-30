/**
 * Copyright TurboNote, 2016. All Rights Reserved.
 * @author Shuo Wu
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { StoreProvider, createStore } from 'easy-peasy'
import Logger from 'js-logger'
import { storeModel } from './store'
import App from './containers/App'
import GlobalStyle from './globalStyle'
import CommonGlobalStyle from '../common/globalStyle'
import i18n from '../common/i18n'
import { APP_ID } from '../constants'

export default class YiNote {
  #store

  constructor() {
    this.#store = createStore(storeModel)
    Logger.useDefaults()
    i18n.init()
  }

  get store() {
    return this.#store
  }

  render() {
    const container = document.createElement('div')
    container.id = APP_ID
    document.body.appendChild(container)

    ReactDOM.render(
      <StoreProvider store={this.#store}>
        <MemoryRouter initialEntries={['/video-notes']}>
          <CommonGlobalStyle />
          <GlobalStyle />
          <App />
        </MemoryRouter>
      </StoreProvider>,
      container
    )
  }

  destroy() {
    const yinoteEl = document.getElementById(APP_ID)
    if (yinoteEl) {
      yinoteEl.parentNode.removeChild(yinoteEl)
    }
  }
}
