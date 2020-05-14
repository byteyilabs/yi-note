import { uuid } from 'uuidv4';
import { getRedirectUrl, enhancedFetch } from './utils';

const getParamsFromCallbackUrl = url => {
  const parsedUrl = new URL(url);
  return parsedUrl.hash
    .substring(1)
    .split('&')
    .reduce((params, part) => {
      const parts = part.split('=');
      params[parts[0]] = parts[1];
      return params;
    }, {});
};

class Oauth2 {
  constructor(config) {
    this.storage = browser.storage.local;
    this.provider = config.provider;
    this.issuer = config.issuer;
    this.clientId = config.clientId;
    this.scopes = config.scopes;
    this.apiBaseUrl = config.apiBaseUrl;
    this.tokenExpiryPredicate = config.tokenExpiryPredicate;
  }

  getRequestUrl() {
    let url = `${this.issuer}?`;
    url += '&response_type=token';
    url += `&scope=${encodeURIComponent(this.scopes.join(' '))}`;
    url += `&client_id=${this.clientId}`;
    url += `&redirect_uri=${encodeURIComponent(getRedirectUrl(this.provider))}`;
    url += `&state=${uuid()}`;
    return url;
  }

  cacheAccessToken(accessToken) {
    return this.storage.set({ [this.provider]: { accessToken } });
  }

  clearAccessToken() {
    return browser.storage.local.get(this.provider).then(data => {
      const dataToSave = data[this.provider];
      delete dataToSave.accessToken;
      return browser.storage.local.set({ [this.provider]: dataToSave });
    });
  }

  getAccessTokenFromCache() {
    return this.storage.get(this.provider).then(data => {
      const providerData = data[this.provider] || {};
      return providerData.accessToken;
    });
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      this.getAccessTokenFromCache().then(accessToken => {
        if (accessToken) {
          resolve(accessToken);
          return;
        }

        // OAuth2 implicit flow to get accessToken
        const requestUrl = this.getRequestUrl();
        browser.identity
          .launchWebAuthFlow({ interactive: true, url: requestUrl })
          .then(url => {
            const params = getParamsFromCallbackUrl(url);
            const accessToken = params.access_token;
            this.cacheAccessToken(accessToken).then(() => {
              resolve(accessToken);
            });
          })
          .catch(error => {
            if (typeof error === 'object') {
              reject(error);
            } else {
              const params = getParamsFromCallbackUrl(error);
              reject(new Error(params.error));
            }
          });
      });
    });
  }

  callApi(path, request = {}) {
    const url = this.apiBaseUrl ? `${this.apiBaseUrl}${path}` : path;
    return this.getAccessToken().then(token => {
      request.headers = request.headers || {};
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${token}`
      };
      return enhancedFetch(url, request).catch(error => {
        return this.getAccessTokenFromCache().then(token => {
          if (
            token &&
            this.tokenExpiryPredicate &&
            this.tokenExpiryPredicate(error)
          ) {
            return this.clearAccessToken().then(() =>
              this.callApi(path, request)
            );
          }
          throw error;
        });
      });
    });
  }
}

export default Oauth2;
