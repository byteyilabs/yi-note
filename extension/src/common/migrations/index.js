export default ({ version, data }) =>
  import(`./${version}`).then(module => module.default(data))
