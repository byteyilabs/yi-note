browser.browserAction.onClicked.addListener(tab => {
  browser.tabs
    .sendMessage(tab.id, { action: 'togglePanel' })
    .catch(() => window.alert(browser.i18n.getMessage('failedToConnect')))
})

browser.runtime.onMessage.addListener(({ action }) => {
  switch (action) {
    case 'open-options':
      browser.runtime.openOptionsPage()
      return true
  }
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
browser.runtime.onConnect.addListener(() => {})
