import Logger from 'js-logger';
import migration_v_0_6_4 from './migrations/0.6.4';

Logger.useDefaults();

browser.browserAction.onClicked.addListener(tab => {
  browser.tabs.sendMessage(tab.id, { action: 'togglePanel' }).catch(e => {
    logger.error(e);
    browser.runtime.openOptionsPage();
  });
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const openOptions = options => {
    let timer;
    let counter = 10;
    const sendMessage = () => {
      return browser.runtime
        .sendMessage(options)
        .then(() => {
          window.clearTimeout(timer);
        })
        .catch(err => {
          window.clearTimeout(timer);
          if (counter-- === 0) {
            logger.error(err);
            return;
          }
          timer = window.setTimeout(sendMessage, 200);
        });
    };
    browser.runtime.openOptionsPage().then(sendMessage);
  };

  const exportFile = () => {
    browser.downloads.download({
      filename: message.filename,
      url: URL.createObjectURL(message.blob),
      saveAs: false
    });
  };

  const copyToClipboard = () => {
    const { data: text } = message;
    const copyFrom = document.createElement('textarea');
    copyFrom.textContent = text;
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    body.removeChild(copyFrom);
    sendResponse({ code: 'success' });
  };

  const { action } = message;
  switch (action) {
    case 'open-options':
      openOptions(message.data);
      return true;
    case 'export-file':
      exportFile();
      return true;
    case 'copy':
      copyToClipboard();
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
