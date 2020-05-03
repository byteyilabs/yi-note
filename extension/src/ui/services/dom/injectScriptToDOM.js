export default () =>
  new Promise(resolve => {
    const script = document.createElement('script');
    if (typeof browser !== 'undefined') {
      script.src = browser.extension.getURL('dist/inject.js');
    } else {
      script.src = 'dist/inject.js';
    }
    const dom = document.head || document.documentElement;
    dom.appendChild(script);
    script.onload = () => {
      script.parentNode.removeChild(script);
      resolve();
    };
  });
