export default provider => {
  return `${browser.identity.getRedirectURL()}${provider}`;
};
