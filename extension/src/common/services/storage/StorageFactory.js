import LocalStorage from './LocalStorage';
import BrowserStorage from './BrowserStorage';
import { NODE_ENV_PLAYGROUND } from '../../constants';

export default class StorageFactory {
  constructor() {}

  static #storage;

  static getStorage(type) {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === NODE_ENV_PLAYGROUND) {
      return new LocalStorage();
    }

    switch (type) {
      default:
        return new BrowserStorage();
    }
  }
}
