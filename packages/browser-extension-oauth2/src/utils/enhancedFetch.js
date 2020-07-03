import HttpError from '../HttpError';

export default (url, request) =>
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

      throw new HttpError(res.status, err);
    });
  });
