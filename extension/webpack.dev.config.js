const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = env => merge(common(env), {
  mode: 'development',
  devtool: 'source-map',
  watch: true
});
