import Generator from './generator';

class Service {
  constructor(data) {
    this.data = data;
    this.generator = new Generator(data);
  }

  async getStoredData(key) {
    const data = await browser.storage.local.get(this.provider);
    const providerData = data[this.provider];
    return providerData ? providerData[key] : null;
  }

  async saveMetadataIntoStorage(key, value) {
    const data = await browser.storage.local.get(this.provider);
    const dataToSave = data[this.provider];
    dataToSave[key] = value;
    await browser.storage.local.set({ [this.provider]: dataToSave });
  }

  sendNotes() {
    logger.warn('Method not implemented');
  }
}

export default Service;
