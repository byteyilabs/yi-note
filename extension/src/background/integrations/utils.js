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
