const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./resources/api.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

module.exports = app;
