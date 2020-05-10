import { secondsToTime, addQueryToUrl } from '../../../common/utils';
import { QUERY_AUTO_JUMP } from '../../../constants';

export default class JspdfGenerator {
  constructor({ url, title, notes }) {
    // eslint-disable-next-line no-undef
    this.doc = new jsPDF();
    this.url = url;
    this.title = title;
    this.notes = notes;
  }

  getBlobOutput() {
    this.doc.setFont('msyh');
    this.doc.setFontType('normal');
    let y = 20;
    this.doc.setFontSize(18);
    this.doc.text(20, y, this.doc.splitTextToSize(this.title, 180));
    y += Math.ceil(this.title.length / 50) * 14;

    this.doc.setFontSize(14);
    this.doc.text(20, y, '-- Notes --');
    y += 10;
    this.doc.setFontSize(12);

    for (const note of this.notes) {
      const content = this.doc.splitTextToSize(note.content, 180);
      if (y + 66 + 6 + 6 * content.length > 300) {
        this.doc.addPage();
        y = 20;
      }
      this.doc.addImage(note.image, 'PNG', 20, y, 100, 60, null, 'NONE');
      y += 66;

      this.doc.setTextColor(71, 99, 255);
      this.doc.textWithLink(secondsToTime(note.timestamp), 20, y, {
        url: addQueryToUrl(this.url, QUERY_AUTO_JUMP, note.timestamp)
      });

      this.doc.setTextColor(0, 0, 0);
      y += 6;
      this.doc.text(20, y, content);
      y += 6 * content.length;
    }

    return this.doc.output('blob');
  }
}
