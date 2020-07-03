import { Storage } from '@yi-note/browser-extension-oauth2';

class Service {
  static KEY_ACCESS_TOKEN = 'accessToken';
  static YI_NOTEBOOK_NAME = 'YiNotebook';

  constructor(namespace, data) {
    this.data = data;
    this.namespace = namespace;
    this.storage = new Storage(namespace);
  }

  sendNotes() {
    return Promise.reject('Method not implemented');
  }

  getExistingId() {
    return this.storage.get(this.data.id);
  }
}

export default Service;
