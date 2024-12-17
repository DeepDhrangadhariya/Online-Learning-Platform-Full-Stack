const express = require("express");
const courseCtrl = require("../../controller/student/courseCtrl");
const routes = express.Router();

routes.get('/get', courseCtrl.getAllStudentViewCourses)
routes.get('/get/details/:id', courseCtrl.getStudentViewCourseDetails)

module.exports = routes;