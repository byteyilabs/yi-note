import Storage from './Storage';
import {
  enhancedFetch,
  getRedirectUrl,
  getParamsFromCallbackUrl,
  generateRandomString
} from './utils';

const ACESS_TOKEN_KEY = 'accessToken';

class Oauth2 {
  constructor(config) {
    this.provider = config.provider;
    this.storage = new Storage(this.provider);
    this.authorizationEndpoint = config.authorization_endpoint;
    this.responseType = 'token';
    this.clientId = config.client_id;
    this.scopes = config.scopes;
    this.apiBaseUrl = config.api_base_url;
  }

  promptErrorHandler(err) {
    let error;
    if (typeof err === 'string') {
      const params = getParamsFromCallbackUrl(error);
      error = new Error(params.error);
    } else {
      error = err;
    }
    throw error;
  }

  getAccessTokenImplict() {
    const state = generateRandomString();
    let url = this.authorizationEndpoint;
    url += `?response_type=${this.responseType}`;
    url += `&scope=${encodeURIComponent(this.scopes.join(' '))}`;
    url += `&client_id=${this.clientId}`;
    url += `&redirect_uri=${encodeURIComponent(getRedirectUrl(this.provider))}`;
    url += `&state=${state}`;

    return browser.identity
      .launchWebAuthFlow({ interactive: true, url })
      .then(url => {
        const params = getParamsFromCallbackUrl(url);
        const accessToken = params.access_token;
        if (params.state !== state) {
          throw new Error('Invalid state.');
        }
        if (params.error) {
          throw new Error(params.error);
        }
        return this.storage
          .set(ACESS_TOKEN_KEY, accessToken)
          .then(() => accessToken);
      })
      .catch(this.promptErrorHandler);
  }

  getAccessToken() {
    return this.storage.get(ACESS_TOKEN_KEY).then(accessToken => {
      if (accessToken) {
        return accessToken;
      }
      return this.getAccessTokenImplict();
    });
  }

  callApi(path, request = {}) {
    const url = this.apiBaseUrl ? `${this.apiBaseUrl}${path}` : path;
    return this.getAccessToken()
      .then(token => {
        request.headers = request.headers || {};
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ${token}`
        };
        return enhancedFetch(url, request);
      })
      .catch(error => {
        if (error.status === 401) {
          return this.storage
            .remove(ACESS_TOKEN_KEY)
            .then(() => this.callApi(path, request));
        }
        throw error.error;
      });
  }
}

export default Oauth2;
