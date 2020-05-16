import Service from '../service';
import Oauth2 from '../oauth2';
import Generator from './generator';

const YiNotebookName = 'YiNotebook';

class OneNote extends Service {
  constructor(data) {
    super(data);

    this.provider = 'onenote';
    this.oauth2 = new Oauth2({
      provider: this.provider,
      issuer: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      clientId: 'ab2e71d8-340a-4889-8039-26b70504871c',
      scopes: ['notes.create'],
      apiBaseUrl: 'https://graph.microsoft.com/v1.0/me/onenote'
    });
    this.generator = new Generator(data);
  }

  async sendNotes() {
    const { id, meta, notes } = this.data;
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
    const { value: sections } = await this.oauth2.callApi('/sections');
    let section = sections.find(({ displayName }) => displayName === 'YiNote');
    if (!section) {
      section = await this.oauth2.callApi(
        `/notebooks/${notebook.id}/sections`,
        {
          method: 'POST',
          body: JSON.stringify({ displayName: 'YiNote' })
        }
      );
    }
    const note = await this.oauth2.callApi(`/sections/${section.id}/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html'
      },
      body: this.generator.generatePayload(meta, notes)
    });
    const noteId = note.id;
    return this.saveMetadataIntoStorage(id, noteId);
  }
}

export default OneNote;
