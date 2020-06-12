export default (tags, tag) => {
  const tagsSet = new Set([...tags, tag]);
  return Array.from(tagsSet);
};
