const express = require("express");
const studentCoursesCtrl = require("../../controller/student/studentCoursesCtrl");
const routes = express.Router();

    routes.get('/get/:studentId', studentCoursesCtrl.getCoursesByStudentId)

module.exports = routes;