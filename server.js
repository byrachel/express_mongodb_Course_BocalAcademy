const http = require('http');
const app = require('./app');
const db = require('./lib/db');

db.connect("mongodb://localhost:27017", "test")
    .then(() => console.log("Connected to MongoDB."))
    .catch(() => console.log("DB not connected"));

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);