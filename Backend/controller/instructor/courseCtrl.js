const courseSchema = require("../../model/courseSchema")

module.exports.addNewCourse = async (req, res) => {
    try {

        const courseData = req.body
        const newlyCreatedCourse = new courseSchema(courseData)
        const saveCourse = await newlyCreatedCourse.save()

        if (saveCourse) {
            return res.status(201).json({
                success: true,
                message: "Course Saved Successfully",
                data: saveCourse
            })
        }

    } catch (error) {
        console.log("Course Not Saved!, ", error)
        return res.status(500).json({
            success: false,
            message: "Course Not Saved!",
            error: error
        })
    }
}

module.exports.getAllCourse = async (req, res) => {
    try {

        const coursesList = await courseSchema.find({})

        return res.status(200).json({
            success: true,
            data: coursesList
        })

    } catch (error) {
        console.log("Courses are Not Available!, ", error)
        return res.status(500).json({
            success: false,
            message: "Courses Are Not Available!",
            error: error
        })
    }
}

module.exports.getCourseDetailsById = async (req, res) => {
    try {

        const { id } = req.params
        const courseDetails = await courseSchema.findById(id)

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found!"
            })
        }

        return res.status(200).json({
            success: true,
            data: courseDetails
        })

    } catch (error) {
        console.log("Course Not Found!, ", error)
        return res.status(500).json({
            success: false,
            message: "Course Not Found!",
            error: error
        })
    }
}

module.exports.updateCourseById = async (req, res) => {
    try {

        const { id } = req.params
        const updatedCourseData = req.body

        const updatedCourse = await courseSchema.findByIdAndUpdate(id, updatedCourseData, { new: true })

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course Updated Successfully",
            data: updatedCourse
        })

    } catch (error) {
        console.log("Course Not Updated!, ", error)
        return res.status(500).json({
            success: false,
            message: "Course Not Updated!",
            error: error
        })
    }
}