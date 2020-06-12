import { actionOn } from 'easy-peasy';
import app from './app';
import videoNotes, { defaultPage, defaultNote } from './videoNotes';
import search from './search';
import alerts from '../../common/components/Alerts/store';
import tagDialog from '../../common/components/TagDialog/store';

const storeModel = {
  app,
  alerts,
  tagDialog,
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
      state.videoNotes.page = { ...defaultPage };
      state.videoNotes.editor.active = false;
      state.videoNotes.editor.note = { ...defaultNote };
    }
  )
};

export default storeModel;
