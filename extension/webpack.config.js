const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common');

module.exports = env => merge(common(env), {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin()
  ]
});
