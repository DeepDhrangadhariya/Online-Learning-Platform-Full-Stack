const express = require("express")
const courseProgressCtrl = require("../../controller/student/courseProgressCtrl")
const routes = express.Router()

routes.get('/get/:userId/:courseId', courseProgressCtrl.getCurrentCourseProgress)
routes.post('/mark-lecture-viewed', courseProgressCtrl.markCurrentProgressViewed)
routes.post('/reset-progress', courseProgressCtrl.resetCurrentCourseProgress)

module.exports = routes