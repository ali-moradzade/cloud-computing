const express = require('express');
const routes = require('./routes/routes');
const db = require('./apis/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.connect();
routes(app);

module.exports = app;
