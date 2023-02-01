const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const dbConnect = require('./db/dbConnect')
const User = require('./models/user');
const Message = require('./models/message');
const { response } = require('express');

require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mongoose

dbConnect()

// Express

app.post('/register', (req, res) => {
    console.log('hit')

    bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => {
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        });

        user.save()
        .then((result) => {
            res.status(201).send({ msg: 'User successfully created', result });
        })
        .catch((err) => {
            res.status(500).send({ msg: 'Error creating user', error });
        })
    })
    .catch((err) => {
        res.status(500).send({ msg: 'Password not hashed', e })
    });
});

app.get('login', (req, res) => {
    res.status(500)
})

app.listen(5000, () => console.log('Server started on port 5000'));