const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT_DIR = path.resolve(__dirname, '..');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: ROOT_DIR,
    }),
  ],
});
