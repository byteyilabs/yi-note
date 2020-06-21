import { action, thunk } from 'easy-peasy';
import { StorageFactory } from '../../common/services/storage';

const storage = StorageFactory.getStorage();

const presetStatesModel = {
  tags: [],
  setTags: action((state, payload = []) => {
    state.tags = [...payload];
  }),
  loadPresetStates: thunk(async actions => {
    let states = await storage.getStates();
    actions.setTags(states.tags);
    await storage.clearStates();
  })
};

export default presetStatesModel;
