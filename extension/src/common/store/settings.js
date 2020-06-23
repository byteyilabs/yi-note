import { action, thunk } from 'easy-peasy';
import { StorageFactory } from '../services/storage';

const storage = StorageFactory.getStorage();

const settingsModel = {
  data: {},
  setSettings: action((state, payload) => {
    state.data = { ...payload };
  }),
  fetchSettings: thunk(async actions => {
    const settings = (await storage.getSettings()) || {};
    actions.setSettings(settings);
  }),
  setSetting: thunk(async (actions, setting) => {
    const settings = await storage.setSetting(setting);
    actions.setSettings(settings);
  })
};

export default settingsModel;
