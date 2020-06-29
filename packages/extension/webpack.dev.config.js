const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = env =>
  merge(common(env), {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true
  });
