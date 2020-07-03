class Storage {
  constructor(namespace) {
    this.storage = browser.storage.local;
    this.namespace = namespace;
  }

  get(key) {
    return this.storage.get(this.namespace).then(data => {
      data = data[this.namespace] || {};
      return data[key];
    });
  }

  set(key, value) {
    return this.storage.get(this.namespace).then(data => {
      data = data[this.namespace] || {};
      data[key] = value;
      return this.storage.set({ [this.namespace]: data });
    });
  }

  remove(key) {
    return this.set(key, '');
  }
}

export default Storage;
