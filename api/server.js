const express = require('express');
const cors = require('cors');//padroes de comunicação http/https

const { routes } = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = { app };