const mongoose = require('mongoose')

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    },
    freePreview: {
        type: Boolean,
        required: true
    }
})

const courseSchema = new mongoose.Schema({
    instructorId: {
        type: String,
        required: true
    },
    instructorName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    primaryLanguage: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    welcomeMessage: {
        type: String,
        required: true
    },
    pricing: {
        type: Number,
        required: true
    },
    objectives: {
        type: String,
        required: true
    },
    students: [
        {
            studentId: {
                type: String,
            },
            studentName: {
                type: String,
            },
            studentEmail: {
                type: String,
            },
            paidAmount: {
                type: String,
            }
        }
    ],
    curriculum: [lectureSchema],
    isPublised: {
        type: Boolean,
        required: true
    }
})

const courseTable = mongoose.model("Course", courseSchema)

module.exports = courseTable