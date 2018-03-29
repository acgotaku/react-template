process.env.NODE_ENV = 'development';

const express = require('express');
const webpack = require('webpack');

const app = express();
const config = require('./webpack.dev.js');

const compiler = webpack(config);

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  quiet: true,
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
});
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(devMiddleware);

app.use(hotMiddleware);

// Serve the files on port 3000.
app.listen(DEFAULT_PORT, HOST, () => {
  // eslint-disable-next-line
  console.log(`Example app listening on ${HOST}!\n`);
});
