import EvernoteSDK from 'evernote';
import md5 from 'md5';
import bufferFrom from 'buffer-from';
import { getRedirectUrl, enhancedFetch } from './utils';
import { secondsToTime, addQueryToUrl } from '../../common/utils';
import { QUERY_AUTO_JUMP } from '../../constants';

const PROVIDER = 'evernote';

const escape = url => {
  var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };
  return url.replace(/[&<>]/g, tag => {
    return tagsToReplace[tag] || tag;
  });
};

class Evernote {
  storage;

  constructor() {
    this.storage = browser.storage.local;
  }

  cacheAccessToken(accessToken) {
    return this.storage.set({ evernote: { accessToken } });
  }

  clearAccessToken() {
    return this.storage.remove(PROVIDER);
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      this.storage.get(PROVIDER).then(data => {
        const { accessToken } = data.evernote || {};
        if (accessToken) {
          resolve(accessToken);
          return;
        }

        // OAuth flow to get accessToken
        const redirectUrl = getRedirectUrl(PROVIDER);
        enhancedFetch(
          `${process.env.REST_BASE_URL}/evernote/authorize-url?redirectUrl=${redirectUrl}`
        ).then(data => {
          const { oauthUrl, oauthToken, oauthSecret } = data;
          browser.identity
            .launchWebAuthFlow({ interactive: true, url: oauthUrl })
            .then(url => {
              const parsedUrl = new URL(url);
              const params = new URLSearchParams(parsedUrl.search);
              const verifier = params.get('oauth_verifier');

              enhancedFetch(
                `${process.env.REST_BASE_URL}/evernote/access-token`,
                {
                  method: 'POST',
                  body: JSON.stringify({ oauthToken, oauthSecret, verifier })
                }
              ).then(({ accessToken }) => {
                this.cacheAccessToken(accessToken).then(() => {
                  resolve(accessToken);
                });
              });
            })
            .catch(err => reject(err));
        });
      });
    });
  }

  convertNotesToEvernoteFormat(data) {
    const {
      meta: { url, title, description },
      notes
    } = data;
    let nBody =
      '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
    nBody += '<en-note>';
    nBody += `<span>Notes are auto-generated from <a style="padding-bottom: 20px;" href="https://github.com/shuowu/yi-note#installation">YiNote browser extension</a></span>`;
    nBody += '<br/><br/>';
    nBody += `<a style="padding-bottom: 20px;" href="${escape(
      url
    )}">${browser.i18n.getMessage('evernote_note_origin')}</a>`;
    nBody += '<br/><br/>';
    nBody += `<div>${description}</div>`;
    nBody += '<br/>';
    if (notes.length) {
      nBody += `<div style="font-size: 20px; font-weight: 600;">${browser.i18n.getMessage(
        'evernote_note_list'
      )}</div>`;
    }
    const resources = [];
    notes.forEach(note => {
      const timestampedUrl = addQueryToUrl(
        url,
        QUERY_AUTO_JUMP,
        note.timestamp
      );
      if (note.image) {
        // Convert image to binary, then save as Evernote resource
        const fileMime = 'image/jpeg';
        const fileName = `${note.timestamp}.jpeg`;
        const binaryResource = bufferFrom(note.image.split(',')[1], 'base64');
        const md5Hash = md5(binaryResource);
        const resourceAttributes = new EvernoteSDK.Types.ResourceAttributes({
          fileName
        });
        const resource = new EvernoteSDK.Types.Resource({
          data: new EvernoteSDK.Types.Data({ body: binaryResource }),
          mime: fileMime,
          attributes: resourceAttributes
        });
        resources.push(resource);

        nBody += `<en-media width="640" height="480" type="${fileMime}" hash="${md5Hash}" />`;
      }
      nBody += `<div><span style="padding-right: 20px;"><a href="${escape(
        timestampedUrl
      )}">${secondsToTime(note.timestamp)}</a></span><span>${
        note.content
      }</span></div>`;
    });

    nBody += '</en-note>';

    // Create note object
    const note = new EvernoteSDK.Types.Note();
    note.title = title;
    note.content = nBody;
    note.resources = resources;

    return note;
  }

  saveNotes(data) {
    return this.getAccessToken()
      .then(token => {
        const client = new EvernoteSDK.Client({ token });
        const store = client.getNoteStore();
        const note = this.convertNotesToEvernoteFormat(data);
        if (data.evernoteId) {
          note['guid'] = data.evernoteId;
          return store.updateNote(note);
        } else {
          return store.createNote(note);
        }
      })
      .catch(err => {
        if (err.errorCode === EvernoteSDK.Errors.EDAMErrorCode.AUTH_EXPIRED) {
          return this.clearAccessToken().then(() => {
            // Clear cached token and retry
            return this.saveNotes(data);
          });
        }
        throw err;
      });
  }
}

export default Evernote;
