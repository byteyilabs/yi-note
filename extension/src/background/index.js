import i18n from 'i18next'
import { init as initTranslation } from '../i18n'
import { getVersion } from './utils'

initTranslation()

browser.browserAction.onClicked.addListener(tab => {
  browser.tabs.sendMessage(tab.id, { action: 'togglePanel', version: getVersion() })
    .catch(({ message }) => {
      window.alert(i18n.t('failedToConnect'))
    })
})

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    // TODO: handle install, maybe compare version
  }

  if (reason === 'update') {
    // TODO: handle install
  }
})

// NOTE: This is used by the extension to detect updates.
browser.runtime.onConnect.addListener(port => {})
