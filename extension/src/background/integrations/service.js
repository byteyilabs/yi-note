import { Storage } from 'browser-extension-oauth2';

class Service {
  static KEY_ACCESS_TOKEN = 'accessToken';
  static YI_NOTEBOOK_NAME = 'YiNotebook';

  constructor(namespace, data) {
    this.data = data;
    this.namespace = namespace;
    this.storage = new Storage(namespace);
  }

  sendNotes() {
    logger.warn('Method not implemented');
  }
}

export default Service;
