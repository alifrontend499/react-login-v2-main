const mongoose = require('mongoose')
const collectionName = 'Users';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    lastName: {
        type: String,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model(collectionName, userSchema)