const mongoose = require('mongoose')
const express = require('express')
const app = express()
const courses = require('./routes/courses')
const User = require('./routes/users')
const Auth = require('./routes/auth')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/courses', courses)
app.use('/api/user', User)
app.use('/api/auth', Auth)


// connection to mongoDB
mongoose.connect('mongodb://localhost:27017/courseinfo')
    .then(() => console.log("Conntected to MongoDB..."))
    .catch(err => console.error("Not connected to MongoDB", err))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))