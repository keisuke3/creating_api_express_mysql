const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./resources/api.router');

const middlewareForAllowOrigin = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

app.use(middlewareForAllowOrigin);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

module.exports = app;
