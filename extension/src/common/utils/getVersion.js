export default () => {
  if (typeof browser === 'undefined') {
    return '';
  }

  const { version } = browser.runtime.getManifest();
  return version;
};
