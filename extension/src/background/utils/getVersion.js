export default () => {
  const { version } = browser.runtime.getManifest()
  return version
}
