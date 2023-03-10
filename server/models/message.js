const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
},  {timestamps: true }, 
    {collection: 'messages' }
);

module.exports = mongoose.model('Message', messageSchema);