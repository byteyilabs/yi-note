import Coursera from './Coursera';
import Udemy from './Udemy';
import SyncBase from './SyncBase';

const DOMAIN_CLASS_MAPPING = {
  'coursera.org': Coursera,
  'udemy.com': Udemy
};

export default class SyncFactory {
  static #service;

  static getSyncService() {
    if (this.#service) {
      return this.#service;
    }

    const { hostname } = window.location;
    let serviceClass = SyncBase;
    for (let domain in DOMAIN_CLASS_MAPPING) {
      if (hostname.includes(domain)) {
        serviceClass = DOMAIN_CLASS_MAPPING[domain];
        break;
      }
    }
    this.#service = new serviceClass();
    return this.#service;
  }
}
