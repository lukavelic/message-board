const mongoose = require('mongoose');
require('dotenv').config()

async function dbConnect() {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.log('Unable to connect to MongoDB')
        console.error(err);
    })
};

module.exports = dbConnect;