const courseSchema = require('../../model/courseSchema')
const studentCoursesShema = require('../../model/studentCoursesSchema')

module.exports.getAllStudentViewCourses = async (req, res) => {
    try {

        const { category = [],
            level = [],
            primaryLanguage = [],
            sortBy = "price-lowtohigh",
        } = req.query

        let filters = {}

        if (category.length) {
            filters.category = { $in: category.split(',') }
        }

        if (level.length) {
            filters.level = { $in: level.split(',') }
        }

        if (primaryLanguage.length) {
            filters.primaryLanguage = { $in: primaryLanguage.split(',') }
        }

        const sortParams = {}

        switch (sortBy) {
            case 'price-lowtohigh':
                sortParams.pricing = 1
                break;

            case 'price-hightolow':
                sortParams.pricing = -1
                break;

            case 'title-atoz':
                sortParams.title = 1
                break;

            case 'title-ztoa':
                sortParams.title = -1
                break;

            default:
                sortParams.pricing = 1
                break;
        }

        const coursesList = await courseSchema.find(filters).sort(sortParams)

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

module.exports.checkCoursePurchaseInfo = async (req, res) => {
    try {

        const { id, studentId } = req.params

        // console.log(id)
        // console.log(studentId)

        const studentCourses = await studentCoursesShema.findOne({
            userId: studentId
        })

        if (!studentCourses) {
            // console.log(studentCourses)
            return res.status(200).json({
                success: true,
                message: "Course Details Found",
                data: false
            })
        }

        // console.log(studentCourses)

        const ifStudentAlreadyBoughtCurrentCourse = studentCourses.courses.findIndex(item => item.courseId === id) > -1

        return res.status(200).json({
            success: true,
            message: "Course Details Found",
            data: ifStudentAlreadyBoughtCurrentCourse
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