import Oauth2 from 'browser-extension-oauth2';
import Service from '../service';
import Generator from './generator';

class OneNote extends Service {
  constructor(namespace, data) {
    super(namespace, data);

    const manifest = browser.runtime.getManifest();
    const clientId =
      manifest.browser === 'firefox'
        ? '5a06bf8d-6526-4b65-a85b-221f6dde2639'
        : 'ab2e71d8-340a-4889-8039-26b70504871c';
    this.oauth2 = new Oauth2({
      provider: this.namespace,
      authorization_endpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      client_id: clientId,
      scopes: ['notes.create'],
      api_base_url: 'https://graph.microsoft.com/v1.0/me/onenote'
    });
    this.generator = new Generator(data);
  }

  async sendNotes() {
    const { id, meta, notes } = this.data;
    const { value: notebooks } = await this.oauth2.callApi('/notebooks');
    let notebook = notebooks.find(
      ({ displayName }) => displayName === Service.YI_NOTEBOOK_NAME
    );
    if (!notebook) {
      notebook = await this.oauth2.callApi('/notebooks', {
        method: 'POST',
        body: JSON.stringify({ displayName: Service.YI_NOTEBOOK_NAME })
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
    return this.storage.set(id, noteId);
  }
}

export default OneNote;
