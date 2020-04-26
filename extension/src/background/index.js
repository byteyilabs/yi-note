import { getVersion } from './utils'

browser.browserAction.onClicked.addListener(tab => {
  browser.tabs.sendMessage(tab.id, { action: 'togglePanel', version: getVersion() })
    .catch(() => window.alert(browser.i18n.getMessage('failed_to_connect')))
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
