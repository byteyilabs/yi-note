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
      content: './src/ui/content-script.js',
      background: './src/background/index.js',
      options: './src/options/index.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward'
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.png$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[ext]'
          }
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                rootMode: 'upward'
              }
            },
            {
              loader: "react-svg-loader",
              options: {
                jsx: true // true outputs JSX tags
              }
            }
          ]
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
        { from: 'src/vendors', to: 'vendors' }
      ]),
      new HtmlWebPackPlugin({
        template: 'src/options/index.html',
        filename: 'options.html',
        browserPolyfill: 'vendors/browser-polyfill.js',
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
