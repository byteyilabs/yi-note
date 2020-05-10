export default (url, key, value) => {
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);
  params.set(key, value);

  parsedUrl.search = params.toString();

  return parsedUrl.toString();
};
