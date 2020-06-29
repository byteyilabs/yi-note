import { storage as StorageService } from '@yi-note/common/services';
import { KEY_VIDEO_SEEK_SECONDS } from '@yi-note/common/constants';

export default class Player {
  constructor() {
    StorageService.getStorage()
      .getSettings()
      .then(settings => {
        this.seekSeconds = +settings[KEY_VIDEO_SEEK_SECONDS] || 0;
      });
  }

  getVideoElement() {
    logger.warn('Method need to be implemented');
  }

  play() {
    logger.warn('Method need to be implemented');
  }

  pause() {
    logger.warn('Method need to be implemented');
  }

  seek() {
    logger.warn('Method need to be implemented');
  }

  async getCurrentTime() {
    logger.warn('Method need to be implemented');
    return Promise.resolve(0);
  }

  async getDuration() {
    logger.warn('Method need to be implemented');
    return Promise.resolve(0);
  }
}
