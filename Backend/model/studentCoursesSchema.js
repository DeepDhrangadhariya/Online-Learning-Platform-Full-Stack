const mongoose = require('mongoose')

const StudentCoursesSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    courses: [
        {
            courseId: {
                type: String,
            },
            title: {
                type: String,
            },
            instructorId: {
                type: String,
            },
            instructorName: {
                type: String,
            },
            dateOfPurchase: {
                type: Date,
            },
            courseImage: {
                type: String,
            }
        }
    ]
})

const studentCoursesTable = mongoose.model('Student Course', StudentCoursesSchema)

module.exports = studentCoursesTable