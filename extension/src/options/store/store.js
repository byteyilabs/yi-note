import app from './app';
import bookmarks from './bookmarks';
import page from '../../common/store/page';
import alerts from '../../common/components/Alerts/store';
import tagDialog from '../../common/components/TagDialog/store';
import { thunk } from 'easy-peasy';

const storeModel = {
  app,
  bookmarks,
  page,
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
