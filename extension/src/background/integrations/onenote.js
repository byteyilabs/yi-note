import { uuid } from 'uuidv4';
import merge from 'deepmerge';
import { getRedirectUrl, enhancedFetch } from './utils';
import { secondsToTime, getUrlWithTimestamp } from '../../common/utils';

const PROVIDER = 'onenote';
const CLIENT_ID = 'ab2e71d8-340a-4889-8039-26b70504871c';
const YiNotebookName = 'YiNotebook';

const getRequestUrl = () => {
  let url = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?';
  url += '&response_type=token';
  url += '&scope=notes.create';
  url += `&client_id=${CLIENT_ID}`;
  url += `&redirect_uri=${encodeURIComponent(getRedirectUrl(PROVIDER))}`;
  url += `&state=${uuid()}`;
  return url;
};

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

const generatePage = (meta, notes) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${meta.title}</title>
    </head>
    <body>
      <span>
        Generated from
        <a href="https://github.com/shuowu/yi-note#installation">YiNote browser extension</a>
      </span>
      <p>${meta.description}</p>
      <div>
      ${notes.map(note => {
        return `
          <div>
            <img src=${note.image} />
            <span>
              <a href="${getUrlWithTimestamp(meta.url, note.timestamp)}">
                ${secondsToTime(note.timestamp)}
              </a>
            </span>
            <p>${note.content}</p>
          </div>
        `;
      })}
      </div>
    </body>
  </html>
`;

class OneNote {
  client;
  storage;

  constructor() {
    this.storage = browser.storage.local;
  }

  cacheAccessToken(accessToken) {
    return this.storage.set({ [PROVIDER]: { accessToken } });
  }

  clearAccessToken() {
    return this.storage.remove(PROVIDER);
  }

  getAccessTokenFromCache() {
    return this.storage.get(PROVIDER).then(data => {
      const providerData = data[PROVIDER] || {};
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
        const requestUrl = getRequestUrl();
        browser.identity
          .launchWebAuthFlow({ interactive: true, url: requestUrl })
          .then(url => {
            const params = getParamsFromCallbackUrl(url);
            const accessToken = params.access_token;
            this.cacheAccessToken(accessToken).then(() => {
              resolve(accessToken);
            });
          })
          .catch(url => {
            const params = getParamsFromCallbackUrl(url);
            reject(params.error);
          });
      });
    });
  }

  api(path, request = {}) {
    const baseUrl = 'https://graph.microsoft.com/v1.0/me/onenote';
    return this.getAccessToken().then(token => {
      const defaultRequest = {
        withCredentials: true,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      return enhancedFetch(
        `${baseUrl}${path}`,
        merge(defaultRequest, request)
      ).catch(({ error }) => {
        return this.getAccessTokenFromCache().then(token => {
          if (token && error.code === 'InvalidAuthenticationToken') {
            return this.clearAccessToken().then(() => this.api(path, request));
          }
          throw error;
        });
      });
    });
  }

  async saveNotes({ meta, notes }) {
    try {
      const { value: notebooks } = await this.api('/notebooks');
      let notebook = notebooks.find(
        ({ displayName }) => displayName === YiNotebookName
      );
      if (!notebook) {
        notebook = await this.api('/notebooks', {
          method: 'POST',
          body: JSON.stringify({ displayName: YiNotebookName })
        });
      }
      const { value: sections } = await this.api('/sections');
      let section = sections.find(
        ({ displayName }) => displayName === 'YiNote'
      );
      if (!section) {
        section = await this.api(`/notebooks/${notebook.id}/sections`, {
          method: 'POST',
          body: JSON.stringify({ displayName: 'YiNote' })
        });
      }
      const page = await this.api(`/sections/${section.id}/pages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html'
        },
        body: generatePage(meta, notes)
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default OneNote;
