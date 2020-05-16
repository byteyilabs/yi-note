/* eslint-disable */
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})

  return {
    entry: {
      dev: './playground/index.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(mp4|png)$/,
          use: 'file-loader'
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './playground/index.html',
        filename: './index.html',
        favicon: './playground/favicon.ico'
      }),
      new webpack.DefinePlugin(envKeys)
    ],
    mode: 'development',
    optimization: {
      usedExports: true
    },
    devtool: 'source-map',
    devServer: {
      port: 4000,
      historyApiFallback: true
    }
  }
}
