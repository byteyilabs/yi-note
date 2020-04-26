/* eslint-disable */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: './src/content.js',
    background: './src/background/index.js',
    inject: './src/inject/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js'
      }
    ])
  ]
}
