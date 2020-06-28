import { actionOn, thunkOn } from 'easy-peasy';
import app from './app';
import videoNotes from './videoNotes';
import search from './search';
import { page, settings, alerts } from '@yi-note/common/store';

const storeModel = {
  app,
  alerts,
  videoNotes,
  search,
  page,
  settings,
  onSetPage: actionOn(
    actions => actions.page.setPage,
    state => {
      state.search.bookmarks = [];
      state.search.notes = [];
    }
  ),
  onSetUrl: thunkOn(
    actions => actions.app.setUrl,
    async actions => {
      actions.videoNotes.reset();
      actions.page.reset();
    }
  )
};

export default storeModel;
