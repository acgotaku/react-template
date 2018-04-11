process.env.NODE_ENV = 'development';

const express = require('express');
const opn = require('opn');
const chalk = require('chalk');
const webpack = require('webpack');

const app = express();
const config = require('./config.js');
const webpackConfig = require('./webpack.dev.js');

const compiler = webpack(webpackConfig);

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || config.dev.port;
const HOST = process.env.HOST || '0.0.0.0';

const uri = `http://localhost:${DEFAULT_PORT}`;
const history = require('connect-history-api-fallback');
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
});
// force page reload when html-webpack-plugin template changes
compiler.hooks.done.tap('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// handle fallback for HTML5 history API
app.use(history());

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(devMiddleware);

app.use(hotMiddleware);

// Serve the files on port 3000.
app.listen(DEFAULT_PORT, HOST, () => {
  // eslint-disable-next-line
  console.log(`> Listening at http://localhost:${chalk.bold(DEFAULT_PORT)}!\n`);
  if (config.dev.autoOpenBrowser) {
    opn(uri);
  }
});
