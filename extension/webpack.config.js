const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const common = require('./webpack.common');
const pkg = require('./package.json');

module.exports = env => merge(common(env), {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new FileManagerPlugin({
      onEnd: [
        {
          copy: [
            { source: "icons/**/*", destination: "dist/icons" },
            { source: "_locales/**/*", destination: "dist/_locales" },
            { source: "installed.png", destination: "dist" }
          ]
        },
        {
          archive: [
            { source: 'dist', destination: `${pkg.name}_${env}_${pkg.version}.zip` },
          ]
        }
      ]
    })
  ]
});
