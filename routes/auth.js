const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { User } = require('../models/user')

router.post('/', async function (req, res) {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Email or Password are incorrect.!!")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("Email or Password are incorrect.!!")

    const token = jwt.sign({ _id: user._id }, 'jwtsecretkey')
    res.send(token)
})

function validate(req) {

    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(req, schema)

}

module.exports = router 