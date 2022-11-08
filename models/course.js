const mongoose = require('mongoose')
const Joi = require('joi')

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

const course = mongoose.model('courses', courseSchema)


function validateCourse(course) {

    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)

}

module.exports.course = course
module.exports.validate = validateCourse
