import JspdfGenerator from './JspdfGenerator';

export default class PdfFactory {
  constructor() {}

  /**
   * Get generator instance
   *
   * @param {object} data
   * @param {string} data.url
   * @param {string} data.title
   * @param {array} data.notes
   *
   * @return generator instance
   */
  static getGenerator() {
    return new JspdfGenerator();
  }
}
