import { saveAs } from 'file-saver';
import { getVersion } from '../utils';

const EXPORTED_FILE_NAME = 'yinote.json';

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

export const exportJsonFile = (
  data,
  filename = EXPORTED_FILE_NAME,
  version
) => {
  version = version || getVersion();
  const dataToExport = { version, data };

  // eslint-disable-next-line no-undef
  const blob = new Blob([JSON.stringify(dataToExport)], {
    type: 'text/json;charset=utf-8'
  });
  saveAs(blob, filename);
};
