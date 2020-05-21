import Logger from 'js-logger';
import migration_v_0_6_4 from './migrations/0.6.4';
import * as services from './integrations';
import { capitalize } from '../common/utils';

Logger.useDefaults();

browser.browserAction.onClicked.addListener(tab => {
  browser.tabs.sendMessage(tab.id, { action: 'togglePanel' }).catch(e => {
    logger.error(e);
    browser.runtime.openOptionsPage();
  });
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const openOptions = () => {
    browser.runtime.openOptionsPage();
  };

  const exportFile = () => {
    browser.downloads.download({
      filename: message.filename,
      url: URL.createObjectURL(message.blob),
      saveAs: false
    });
  };

  const sendNotesToService = () => {
    const { data, action } = message;
    const namespace = action.split('-')[2];
    const className = capitalize(namespace);
    const service = new services[className](namespace, data);
    return service
      .sendNotes()
      .then(() => sendResponse({ code: 'success' }))
      .catch(e =>
        sendResponse({
          code: 'error',
          error: e
        })
      );
  };

  const { action } = message;
  switch (action) {
    case 'open-options':
      openOptions();
      return true;
    case 'export-file':
      exportFile();
      return true;
    case 'send-to-evernote':
    case 'send-to-onenote':
    case 'send-to-googledocs':
      sendNotesToService();
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
