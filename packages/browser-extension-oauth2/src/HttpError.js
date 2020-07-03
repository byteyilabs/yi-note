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

export default HttpError;
