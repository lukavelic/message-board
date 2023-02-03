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

dbConnect();
  
// authentication endpoint
app.get("/chat", auth, (req, res) => {
    // let msgs;

    Message.find({}, (err, docs) => {
        if(err) {
            return res.send(err)
        } else {
            res.json(docs)
        }
    })
    // .then(
    //     res.json({ msg: "You are authorized to access me", msgs })
    // )

    // res.json({ msg: "You are authorized to access me"});
});


app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));