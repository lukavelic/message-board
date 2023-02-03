const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const auth = require('./auth');
require('dotenv').config();

const mongoose = require('mongoose');
const dbConnect = require('./db/dbConnect')
const User = require('./models/user');
const Message = require('./models/message');

require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
// Config routes
app.use('/', require('./routes'))

// Connect to MongoDB

dbConnect()

app.post('/log', (req, res) => {
    console.log(req)
})

// free endpoint
app.get("/free-endpoint", (req, res) => {
    res.json({ message: "You are free to access me anytime" });
});
  
// authentication endpoint
app.get("/chat", auth, (req, res) => {
    res.json({ message: "You are authorized to access me" });
});


app.listen(PORT, () => console.log('Server started on port 5000'));