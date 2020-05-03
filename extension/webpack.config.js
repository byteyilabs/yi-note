/* eslint-disable */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
  entry: {
    content: './src/content.js',
    background: './src/background/index.js',
    inject: './src/inject/index.js',
    options: './src/options/index.js'
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
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js'
      }
    ]),
    new HtmlWebPackPlugin({
      template: './src/options/index.html',
      filename: './options.html',
      browserPolyfill: './browser-polyfill.js',
      chunks: ['options']
    }),
    new FileManagerPlugin({
      onEnd: [
        {
          copy: [
            { source: "./dist/**/*", destination: "./bundle/dist" },
            { source: "./icons/**/*", destination: "./bundle/icons" },
            { source: "./_locales/**/*", destination: "./bundle/_locales" },
            { source: "./installed.png", destination: "./bundle" },
            { source: "./manifest.json", destination: "./bundle" }
          ]
        },
        {
          archive: [
            { source: './bundle', destination: `./${pkg.name}_${pkg.version}.zip` },
          ]
        },
        {
          delete: ['./bundle']
        }
      ]
    })
  ]
}
