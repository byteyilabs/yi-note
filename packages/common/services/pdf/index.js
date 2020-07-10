import jsPDF from 'jspdf';
import { secondsToTime, buildAutoSeekUrl, getFileUrl } from '../../utils';
import StorageService from '../storage';
import Markdown from '../markdown';
import {
  WEBSITE_URL,
  KEY_APPLY_SEEK_SEC_ON_URL,
  KEY_VIDEO_SEEK_SECONDS
} from '../../constants';
import msyh from '../../fonts/msyh.ttf';

export default class PDFGenerator {
  constructor() {
    this.doc = new jsPDF();
  }

  static init() {
    fetch(getFileUrl(msyh))
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

  async getBlobOutput({ url, title, notes }) {
    // TODO: pass in options instead of use settings from storage
    const settings = await StorageService.getStorage().getSettings();
    this.seekSeconds = +settings[KEY_VIDEO_SEEK_SECONDS] || 0;
    this.shouldApplySeekSecondsOnUrl = settings[KEY_APPLY_SEEK_SEC_ON_URL];

    this.doc.setFont('msyh');
    this.doc.setFontType('normal');
    let y = 20;

    if (title) {
      this.doc.setFontSize(18);
      this.doc.text(20, y, this.doc.splitTextToSize(title, 180));
      y += Math.ceil(title.length / 50) * 18;
    }

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
      let content = Markdown.toText(note.content);
      content = this.doc.splitTextToSize(content, 180);
      if (y + 66 + 6 + 6 * content.length > 300) {
        this.doc.addPage();
        y = 20;
      }
      this.doc.addImage(note.image, 'PNG', 20, y, 160, 90, null, 'NONE');
      y += 100;

      this.doc.setTextColor(71, 99, 255);
      this.doc.textWithLink(secondsToTime(note.timestamp), 20, y, {
        url: buildAutoSeekUrl(
          url,
          this.shouldApplySeekSecondsOnUrl
            ? note.timestamp - this.seekSeconds
            : note.timestamp
        )
      });

      this.doc.setTextColor(0, 0, 0);
      y += 6;
      this.doc.text(20, y, content);
      y += 6 * content.length;
    }

    return this.doc.output('blob');
  }
}
