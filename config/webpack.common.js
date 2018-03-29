const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    polyfills: './src/polyfills.js',
    app: './src/index.js',
  },
};
