const courseSchema = require('../../model/courseSchema')

module.exports.getAllStudentViewCourses = async (req, res) => {
    try {

        const coursesList = await courseSchema.find({})

        if (coursesList.length === 0) {
            return res.status((404).json({
                success: false,
                message: "No Course Found",
                data: []
            }))
        }

        res.status(200).json({
            success: true,
            message: "Course Data Found",
            data: coursesList
        })

    } catch (error) {
        console.log("Error On Getting Student Courses!, ", error);
        res.status(500).json({
            success: false,
            message: "Error On Getting Student Courses!",
            error: error
        })
    }
}

module.exports.getStudentViewCourseDetails = async (req, res) => {
    try {

        const { id } = req.params
        const courseDetails = await courseSchema.findById(id)

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "No Course Details Found",
                data: null
            })
        }

        res.status(200).json({
            success: true,
            message: "Course Details Found",
            data: courseDetails
        })

    } catch (error) {
        console.log("Error On Geting Course Details!, ", error)
        res.status(500).json({
            success: false,
            message: "Error On Geting Course Details!",
            error: error
        })
    }
}