import bufferFrom from 'buffer-from';
import atob from 'atob';

export const getRedirectUrl = provider => {
  return `${browser.identity.getRedirectURL()}${provider}`;
};

export const enhancedFetch = (url, request) =>
  fetch(url, request).then(res => {
    if (res.ok) {
      return res.json();
    }
    return res.text().then(body => {
      let err;
      try {
        err = JSON.parse(body);
      } catch (e) {
        err = body;
      }

      throw err;
    });
  });

export const getBinaryFromBase64 = encodedUri => {
  return bufferFrom(encodedUri.split(',')[1], 'base64');
};

export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    // eslint-disable-next-line no-undef
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  // eslint-disable-next-line no-undef
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
