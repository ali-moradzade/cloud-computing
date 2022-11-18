const express = require('express');
const fs = require('fs');
const multiparty = require('multiparty');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

routes(app);

module.exports = app;
