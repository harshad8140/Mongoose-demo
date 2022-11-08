const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const { course, validate } = require('../models/course')


router.get('/', async (req, res) => {

    let courses = await course.find({});
    if (courses.length == 0) {
        return res.send("No any course found..")
    } else {
        return res.send(courses)
    }
})


router.post('/', async function (req, res) {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    let courses = new course({ name: req.body.name })
    courses = await courses.save()
    res.send(courses)
})

router.put('/:id', async function (req, res) {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const courses = await course.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!courses) return res.status(404).send("Course is not found..!")

    res.send(courses);
})


router.delete('/:id', async function (req, res) {

    const courses = await course.findByIdAndRemove(req.params.id);
    if (!courses) return res.status(404).send("course is not found..!")
    res.send(courses)

});



module.exports = router