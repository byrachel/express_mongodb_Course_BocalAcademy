const http = require('http');
const app = require('./app');
// const db = require('./lib/db');
const mongoose = require('mongoose');

// WITH MONGODB VANILLA
// db.connect("mongodb://localhost:27017", "test")
//     .then(() => console.log("Connected to MongoDB."))
//     .catch(() => console.log("DB not connected"));

// WITH MONGOOSE
mongoose.connect('mongodb://127.0.0.1:27017/test');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);