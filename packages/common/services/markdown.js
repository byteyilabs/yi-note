import marked from 'marked';

class Markdown {
  static toText(markdownContent) {
    const div = document.createElement('div');
    div.innerHTML = marked(markdownContent);
    return div.innerText;
  }

  static toHTML(markdownContent) {
    return marked(markdownContent);
  }
}

export default Markdown;
