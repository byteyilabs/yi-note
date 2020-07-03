export default url => {
  const parsedUrl = new URL(url);
  return parsedUrl.hash
    .substring(1)
    .split('&')
    .reduce((params, part) => {
      const parts = part.split('=');
      params[parts[0]] = parts[1];
      return params;
    }, {});
};
