const mongoose = require('mongoose')

const lectureProgressSchema = new mongoose.Schema({
    lectureId: {
        type: String,
    },
    viewed: {
        type: Boolean,
    },
    dateViewed: {
        type: Date,
    }
})

const courseProgressSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    courseId: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
    completionDate: {
        type: Date,
    },
    lecturesProgress: [lectureProgressSchema],
})

const courseProgressModel = mongoose.model('Progress', courseProgressSchema)

module.exports = courseProgressModel