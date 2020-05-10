import Logger from 'js-logger';
import migration_v_0_6_4 from './migrations/0.6.4';
import Evernote from './integrations/evernote';

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

  const saveToEvernote = () => {
    const { data } = message;
    const evernote = new Evernote();
    evernote
      .saveNotes(data)
      .then(data => {
        sendResponse({ evernoteId: data.guid });
      })
      .catch(e => {
        logger.error(e);
        sendResponse(e);
      });
  };

  const { action } = message;
  switch (action) {
    case 'open-options':
      openOptions();
      return true;
    case 'export-file':
      exportFile();
      return true;
    case 'save-to-evernote':
      saveToEvernote();
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
