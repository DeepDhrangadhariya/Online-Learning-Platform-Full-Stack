const express = require("express");
const courseCtrl = require("../../controller/instructor/courseCtrl");
const routes = express.Router();

routes.get("/get", courseCtrl.getAllCourse)
routes.get("/get/details/:id", courseCtrl.getCourseDetailsById)

routes.post("/add", courseCtrl.addNewCourse)

routes.put("/update/:id", courseCtrl.updateCourseById)

module.exports = routes;