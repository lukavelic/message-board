const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const mongoose = require('mongoose');
const User = require('./models/user');
const Message = require('./models/message')

exports.register = async (req, res) => {

    console.log('hit register', req.body)

    bcrypt.hash(req.body.password, saltRounds)
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
            res.status(500).send({ msg: 'Error creating user', err });
        })
    })
    .catch((err) => {
        res.status(500).send({ msg: 'Password not hashed', err })
    });

}

exports.login = async (req, res) => {

    console.log('hit login')

    User.findOne( { username: req.body.username })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password)
            .then((passwordCheck) => {
                if(!passwordCheck) {
                    return res.status(400).send({ msg: 'Passwords do not match', err})
                }

                const token = jwt.sign(
                    {
                    userId: user._id,
                    username: user.username,
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h"}
                );

                res.status(200).send({
                    msg: 'Login successful',
                    username: user.username,
                    token,
                });
            })
            .catch((err) => {
                res.status(400).send({ msg: 'Passwords do not match', err})
            })
        })
        .catch((err) => {
            res.status(404).send({ msg: 'Username not found', err })
        })
}

exports.msg = async (req, res) => {
    console.log(req.body)

    const msg = new Message({
        msg: req.body.msg,
        userId: req.body.userId,
    })

    msg.save()
        .then((result) => {
            res.status(201).send({ msg: 'Message sent', result });
        })
        .catch((err) => {
            res.status(500).send({ msg: 'Error sending message', err });
        })
} 