const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// add hot-reload related code to entry chunks
Object.keys(common.entry).forEach((name) => {
  common.entry[name] = ['./config/dev-client'].concat(common.entry[name]);
});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
