import jsPDF from 'jspdf';
import {
  secondsToTime,
  addQueryToUrl,
  getFileUrl
} from '../../../common/utils';
import { QUERY_AUTO_JUMP, WEBSITE_URL } from '../../../constants';
import msyh from '../../../fonts/msyh.ttf';

export default class JspdfGenerator {
  constructor() {
    this.doc = new jsPDF();
  }

  init() {
    return fetch(getFileUrl(msyh))
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const font = reader.result.split(',')[1];
          jsPDF.API.events.push([
            'addFonts',
            function() {
              this.addFileToVFS('msyh-normal.ttf', font);
              this.addFont('msyh-normal.ttf', 'msyh', 'normal');
            }
          ]);
        };
      });
  }

  getBlobOutput({ url, title, notes }) {
    this.doc.setFont('msyh');
    this.doc.setFontType('normal');
    let y = 20;
    this.doc.setFontSize(18);
    this.doc.text(20, y, this.doc.splitTextToSize(title, 180));
    y += Math.ceil(title.length / 50) * 12;

    this.doc.setFontSize(12);
    this.doc.text(20, y, 'Generated from ');
    this.doc.setTextColor(71, 99, 255);
    this.doc.textWithLink('YiNote', 53, y, { url: WEBSITE_URL });
    y += 10;
    this.doc.setTextColor(0, 0, 0);

    this.doc.setFontSize(14);
    this.doc.text(20, y, '-- Notes --');
    y += 10;
    this.doc.setFontSize(12);

    for (const note of notes) {
      const content = this.doc.splitTextToSize(note.content, 180);
      if (y + 66 + 6 + 6 * content.length > 300) {
        this.doc.addPage();
        y = 20;
      }
      this.doc.addImage(note.image, 'PNG', 20, y, 100, 60, null, 'NONE');
      y += 66;

      this.doc.setTextColor(71, 99, 255);
      this.doc.textWithLink(secondsToTime(note.timestamp), 20, y, {
        url: addQueryToUrl(url, QUERY_AUTO_JUMP, note.timestamp)
      });

      this.doc.setTextColor(0, 0, 0);
      y += 6;
      this.doc.text(20, y, content);
      y += 6 * content.length;
    }

    return this.doc.output('blob');
  }
}
