const express = require('express');
const app = express();
const router = require("./routers/posts");

app.use(express.json());
app.use('/', router);

module.exports = app;