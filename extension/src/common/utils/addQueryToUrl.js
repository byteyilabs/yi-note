export default (url, key, value) => {
  // eslint-disable-next-line no-undef
  const parsedUrl = new URL(url);
  // eslint-disable-next-line no-undef
  const params = new URLSearchParams(parsedUrl.search);
  params.set(key, value);

  parsedUrl.search = params.toString();

  return parsedUrl.toString();
};
