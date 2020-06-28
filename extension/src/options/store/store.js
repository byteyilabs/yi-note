import app from './app';
import bookmarks from './bookmarks';
import { page, settings, alerts, tagDialog } from '@yi-note/common/store';
import { thunk } from 'easy-peasy';

const storeModel = {
  app,
  bookmarks,
  page,
  settings,
  alerts,
  tagDialog,
  reset: thunk(actions => {
    for (const model in actions) {
      if (typeof actions[model].reset === 'undefined') {
        continue;
      }
      actions[model].reset();
    }
  })
};

export default storeModel;
