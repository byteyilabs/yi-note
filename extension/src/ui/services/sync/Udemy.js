import SyncBase from './SyncBase';
import { PlayerFactory } from '../player';

export default class Udemy extends SyncBase {
  constructor() {
    super();
    this.platform = 'Udemy';
    this.noteSelector = '[data-purpose="video-bookmark-item"]';
  }

  getTimestamp = async noteEl => {
    const player = await PlayerFactory.getPlayer();
    const duration = await player.getDuration();
    const progress = parseFloat(noteEl.style.left) / 100.0;
    return Math.floor(progress * duration);
  };

  getContent = noteEl => {
    let content;
    const contentEl = noteEl.querySelector('[data-purpose="content"] textarea');
    if (contentEl) {
      content = contentEl.textContent;
    }
    return content;
  };
}
