const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@users-hbw12.mongodb.net/test?retryWrites=true&w=majority`;


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});