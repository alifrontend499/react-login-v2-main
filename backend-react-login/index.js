const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Import Routes
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')

// Initializing Global Variables
dotenv.config()

// connect DB
const DBname = "react-login";
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-fbkj6.mongodb.net/${DBname}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB"))

// Middlewares
app.use(express.json())

// Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postsRoute)



app.listen(1000, () => console.log("Server is running at port 1000"))