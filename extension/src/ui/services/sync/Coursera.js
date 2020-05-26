import SyncBase from './SyncBase';

class Coursera extends SyncBase {
  constructor() {
    super();
    this.platform = 'Coursera';
    this.noteSelector = '.rc-Highlight';
  }

  getTimestamp = noteEl => {
    const timestampButtonEl = noteEl.querySelector(
      '#highlight_timestamp_button'
    );
    const timestampStr = timestampButtonEl.getAttribute('aria-labelledby');
    return Math.floor(timestampStr.split('-')[3]);
  };

  getContent = noteEl => {
    let content;
    const contentEl = noteEl.querySelector('.highlight-note');
    if (contentEl) {
      content = contentEl.textContent;
    }
    return content;
  };
}

export default Coursera;
