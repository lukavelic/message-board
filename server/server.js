const express = require('express');

const mongoose = require('mongoose');
const User = require('./models/user');
const Message = require('./models/message')

const app = express();

// Mongoose

const dbName = 'messageBoard'

mongoose.connect(`mongodb+srv://admin:mongo4889@cluster0.aiwegdd.mongodb.net/${dbName}?retryWrites=true&w=majority`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

async function newUser() {
    const user = new User({name: 'luka', password: 'test'})
    await user.save()
}

newUser();

async function newMsg() {
    const msg = new Message({msg: 'test'})
    await msg.save()
}

newMsg();



// Express

app.get('/api', (req, res) => {
    res.json({ 'users': ['userOne', 'userTwo', 'userThree', 'userFour']})
})

app.listen(5000, () => console.log('Server started on port 5000'));