const studentCoursesShema = require('../../model/studentCoursesSchema')

module.exports.getCoursesByStudentId = async (req, res) => {
    try {

        const { studentId } = req.params
        
        const studentBoughtCourses = await studentCoursesShema.findOne({
            userId: studentId
        })

        res.status(200).json({
            success: true,
            message: "Student Courses Found",
            data: studentBoughtCourses.courses
        })

    } catch (error) {
        console.log("Error While Getting Student Courses", error)
        res.status(500).json({
            success: false,
            message: "Error While Getting Student Courses!",
            error
        })
    }
}