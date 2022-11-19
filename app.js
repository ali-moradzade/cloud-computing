const express = require('express');
const routes = require('./routes/routes');
const db = require('./apis/db');
const ampq = require('./apis/ampq');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.connect();
ampq.start();

routes(app);

module.exports = app;
