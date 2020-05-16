export default path => {
  if (typeof browser !== 'undefined') {
    return browser.runtime.getURL(path);
  }
  return path;
};
