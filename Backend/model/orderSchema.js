const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    userName: {
        type: String,
    },
    userEmail: {
        type: String,
    },
    orderStatus: {
        type: String,
    },
    paymentMethod: {
        type: String,
    },
    paymentStatus: {
        type: String,
    },
    orderDate: {
        type: Date,
    },
    paymentId: {
        type: String,
    },
    payerId: {
        type: String,
    },
    instructorId: {
        type: String,
    },
    instructorName: {
        type: String,
    },
    courseImage: {
        type: String,
    },
    courseTitle: {
        type: String,
    },
    courseId: {
        type: String,
    },
    coursePricing: {
        type: String,
    }
})

const orderTable = mongoose.model('order', orderSchema)

module.exports = orderTable