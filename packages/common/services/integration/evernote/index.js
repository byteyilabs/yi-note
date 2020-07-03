import EvernoteSDK from 'evernote';
import { enhancedFetch } from '@yi-note/browser-extension-oauth2';
import { getRedirectUrl } from '../utils';
import Service from '../service';
import Generator from './generator';
import { REST_BASE_URL } from '../../../constants';

class Evernote extends Service {
  constructor(namespace, data) {
    super(namespace, data);
    this.generator = new Generator(data);
  }

  getAccessToken() {
    return this.storage.get(Service.KEY_ACCESS_TOKEN).then(accessToken => {
      if (accessToken) {
        return accessToken;
      }
      // OAuth flow to get accessToken
      const redirectUrl = getRedirectUrl(this.namespace);
      return enhancedFetch(
        `${REST_BASE_URL}/evernote/authorize-url?redirect_url=${encodeURIComponent(
          redirectUrl
        )}`
      ).then(data => {
        const { oauthUrl, oauthToken, oauthSecret } = data;
        return browser.identity
          .launchWebAuthFlow({ interactive: true, url: oauthUrl })
          .then(url => {
            const parsedUrl = new URL(url);
            const params = new URLSearchParams(parsedUrl.search);
            const verifier = params.get('oauth_verifier');
            return enhancedFetch(`${REST_BASE_URL}/evernote/access-token`, {
              method: 'POST',
              body: JSON.stringify({ oauthToken, oauthSecret, verifier })
            }).then(({ accessToken }) => {
              return this.storage
                .set(Service.KEY_ACCESS_TOKEN, accessToken)
                .then(() => accessToken);
            });
          });
      });
    });
  }

  sendNotes() {
    return this.getAccessToken()
      .then(token => {
        const client = new EvernoteSDK.Client({ token, sandbox: false });
        const store = client.getNoteStore();
        return store
          .listNotebooks()
          .then(notebooks => {
            const yinotebook = notebooks.find(
              notebook => notebook.name === Service.YI_NOTEBOOK_NAME
            );
            if (yinotebook) {
              return yinotebook;
            }
            return store.createNotebook({ name: Service.YI_NOTEBOOK_NAME });
          })
          .then(notebook => {
            const notePayload = this.generator.generatePayload(notebook);
            return store.createNote(notePayload).then(note => {
              return this.storage.set(this.data.id, note.guid).then(() => note);
            });
          });
      })
      .catch(err => {
        if (err.errorCode === EvernoteSDK.Errors.EDAMErrorCode.AUTH_EXPIRED) {
          return this.storage
            .remove(Service.KEY_ACCESS_TOKEN)
            .then(() => this.sendNotes());
        }
        throw err;
      });
  }
}

export default Evernote;
