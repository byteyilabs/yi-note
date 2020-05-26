import { TYPE_VIDEO_NOTE } from '../../../constants';

export default class SyncBase {
  hasNotes() {
    if (!this.noteSelector || !this.platform) {
      return false;
    }
    return !!document.querySelectorAll(this.noteSelector).length;
  }

  async getNotes() {
    const notes = [];
    try {
      const noteEls = document.querySelectorAll(this.noteSelector);
      for (const noteEl of noteEls) {
        const note = {};
        note.timestamp = await this.getTimestamp(noteEl);
        note.content =
          (await this.getContent(noteEl)) ||
          browser.i18n.getMessage('note_empty');
        note.type = TYPE_VIDEO_NOTE;
        notes.push(note);
      }
    } catch (e) {
      logger.error('Failed to parse notes');
    }

    return notes;
  }
}
