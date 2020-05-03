import { actionOn } from 'easy-peasy';
import app from './app';
import videoNotes from './videoNotes';
import search from './search';
import alerts from '../../common/components/Alerts/store';

const storeModel = {
  app,
  alerts,
  videoNotes,
  search,
  onSetPage: actionOn(
    actions => actions.videoNotes.setPage,
    state => {
      state.search.bookmarks = [];
      state.search.notes = [];
    }
  ),
  onSetUrl: actionOn(
    actions => actions.app.setUrl,
    state => {
      state.videoNotes.page.id = '';
      state.videoNotes.editor.active = false;
      state.videoNotes.editor.note = {};
    }
  )
};

export default storeModel;
