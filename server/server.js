const express = require('express');

const mongoose = require('mongoose');
const User = require('./models/user');
const Message = require('./models/message')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mongoose

const dbName = 'messageBoard'

mongoose.connect(`mongodb+srv://admin:mongo4889@cluster0.aiwegdd.mongodb.net/${dbName}?retryWrites=true&w=majority`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

app.post('/register', (req, res) => {
    console.log('hit')

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save((err) => {
        if(err) {
            res.status(500).json({ msg: 'Error registering new user'})
        } else {
            // res.json({ msg: 'User successfully created'})
        }
    })
})

app.listen(5000, () => console.log('Server started on port 5000'));