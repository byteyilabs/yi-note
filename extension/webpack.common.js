/* eslint-disable */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const Dotenv = require('dotenv-webpack');
const pkg = require('./package.json');
const commonManifest = require('./manifest.common.json');

const getManifestPlugin = env => {
  const seed = commonManifest;
  if (env === 'chromium') {
    seed.options_page = 'options.html';
    seed.browser = "chromium";
  } else {
    // Use web extension standard as fallback
    seed.options_ui = {
      page: "options.html",
      browser_style: true
    };
    seed.browser = "firefox";
    seed.permissions.push('downloads');
    seed.permissions.push('<all_urls>');
  }

  return new ManifestPlugin({
    fileName: 'manifest.json',
    seed,
    generate: seed => seed
  })
}

module.exports = env => {
  return {
    entry: {
      content: './src/content.js',
      background: './src/background/index.js',
      options: './src/options/index.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.png$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      getManifestPlugin(env),
      new Dotenv(),
      new CopyWebpackPlugin([
        { from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js' },
        { from: 'src/vendors', to: 'vendors' },
        { from: 'src/ui/services/pdf/fonts', to: 'jspdf-fonts' }
      ]),
      new HtmlWebPackPlugin({
        template: 'src/options/index.html',
        filename: 'options.html',
        browserPolyfill: 'browser-polyfill.js',
        chunks: ['options']
      }),
      new FileManagerPlugin({
        onEnd: [
          {
            copy: [
              { source: "icons/**/*", destination: "dist/icons" },
              { source: "_locales/**/*", destination: "dist/_locales" },
              { source: "installed.png", destination: "dist" }
            ]
          }
        ]
      })
    ]
  };  
};
