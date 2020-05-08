import { saveAs } from 'file-saver';
import { getVersion } from '../utils';

export const readAsJson = file => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = event => {
      const { result } = event.target;
      try {
        resolve(JSON.parse(result));
      } catch (e) {
        reject(e);
      }
    };

    reader.onerror = err => {
      reject(err);
    };
  });
};

export const exportJsonFile = async (data, filename, version) => {
  version = version || getVersion();
  const dataToExport = { version, data };

  // eslint-disable-next-line no-undef
  const blob = new Blob([JSON.stringify(dataToExport)], {
    type: 'text/json;charset=utf-8'
  });
  await exportFile(blob, filename);
};

export const exportFile = async (blob, filename) => {
  const manifest = await browser.runtime.getManifest();
  if (typeof browser !== 'undefined' && manifest.browser === 'firefox') {
    browser.runtime.sendMessage({
      action: 'export-file',
      blob,
      filename
    });
  } else {
    saveAs(blob, filename);
  }
};
