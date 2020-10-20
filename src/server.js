const express = require('express');
const path = require('path');
const app = express();
const webpack = require('webpack');
const port = process.env.PORT || 8080;
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('../webpack.config');
const compiler = webpack(config);

// if (process.env.NODE_ENV !== 'dev') {

// } else {
//   app.use(webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//   }));
// }

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
})

app.listen(port, () => {
  console.log(`FE Dev server ticking away @ ${port}`)
})