class HttpError extends Error {
  constructor(status, error) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.status = status;
    this.error = error;
  }
}

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
