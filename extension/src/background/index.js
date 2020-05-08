import Logger from 'js-logger';
import migration_v_0_6_4 from './migrations/0.6.4';

Logger.useDefaults();

browser.browserAction.onClicked.addListener(tab => {
  browser.tabs.sendMessage(tab.id, { action: 'togglePanel' }).catch(e => {
    logger.error(e);
    browser.runtime.openOptionsPage();
  });
});

browser.runtime.onMessage.addListener(message => {
  const { action } = message;
  switch (action) {
    case 'open-options':
      browser.runtime.openOptionsPage();
      return true;
    case 'export-file':
      browser.downloads.download({
        filename: message.filename,
        // eslint-disable-next-line no-undef
        url: URL.createObjectURL(message.blob),
        saveAs: false
      });
      return true;
  }
});

browser.runtime.onInstalled.addListener(detail => {
  const { reason, previousVersion } = detail;
  if (reason === 'install') {
    // TODO: handle install, maybe compare version
  }

  if (reason === 'update') {
    if (previousVersion === '0.6.4') {
      migration_v_0_6_4();
    }
  }
});

// NOTE: This is used by the extension to detect updates.
browser.runtime.onConnect.addListener(() => {});
