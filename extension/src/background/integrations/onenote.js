import Oauth2 from './oauth2';
import { secondsToTime, getUrlWithTimestamp } from '../../common/utils';

const YiNotebookName = 'YiNotebook';

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
  constructor() {
    this.oauth2 = new Oauth2({
      provider: 'onenote',
      issuer: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      clientId: 'ab2e71d8-340a-4889-8039-26b70504871c',
      scopes: ['notes.create'],
      apiBaseUrl: 'https://graph.microsoft.com/v1.0/me/onenote',
      tokenExpiryPredicate: error =>
        error.error.code === 'InvalidAuthenticationToken'
    });
  }

  async sendNotes({ meta, notes }) {
    try {
      const { value: notebooks } = await this.oauth2.callApi('/notebooks');
      let notebook = notebooks.find(
        ({ displayName }) => displayName === YiNotebookName
      );
      if (!notebook) {
        notebook = await this.oauth2.callApi('/notebooks', {
          method: 'POST',
          body: JSON.stringify({ displayName: YiNotebookName })
        });
      }
      const { value: sections } = await this.api('/sections');
      let section = sections.find(
        ({ displayName }) => displayName === 'YiNote'
      );
      if (!section) {
        section = await this.oauth2.callApi(
          `/notebooks/${notebook.id}/sections`,
          {
            method: 'POST',
            body: JSON.stringify({ displayName: 'YiNote' })
          }
        );
      }
      await this.oauth2.callApi(`/sections/${section.id}/pages`, {
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
