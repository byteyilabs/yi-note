export default class Player {
  constructor(options) {}

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
