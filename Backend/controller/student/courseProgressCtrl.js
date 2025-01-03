const courseProgressSchema = require("../../model/courseProgressSchema")
const courseSchema = require("../../model/courseSchema")
const studentCoursesSchema = require('../../model/studentCoursesSchema')

module.exports.markCurrentProgressViewed = async (req, res) => {
    try {

        const { userId, courseId, lectureId } = req.body

        let progress = await courseProgressSchema.findOne({ userId, courseId })

        if (!progress) {
            progress = new courseProgressSchema({
                userId,
                courseId,
                lecturesProgress: [{
                    lectureId,
                    viewed: true,
                    dateViewed: new Date()
                }]
            })

            await progress.save()
        } else {
            const lecturesProgress = progress.lecturesProgress.find(item => item.lectureId === lectureId)

            if (lecturesProgress) {
                lecturesProgress.viewed = true
                lecturesProgress.dateViewed = new Date()
            } else {
                progress.lecturesProgress.push({
                    lectureId,
                    viewed: true,
                    dateViewed: new Date()
                })
            }

            await progress.save()
        }

        const course = await courseSchema.findById(courseId)

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found!"
            })
        }

        const allLecturesViewd = progress.lecturesProgress.length === course.curriculum.length && progress.lecturesProgress.every(item => item.viewed)

        if (allLecturesViewd) {
            progress.completed = true
            progress.completionDate = new Date()

            await progress.save()
        }

        res.status(200).json({
            success: true,
            message: "Lecture Marked As Viewd",
            data: progress
        })

    } catch (error) {
        console.log("Error While Marking Lecture As Viewd!, ", error)
        res.status(500).json({
            success: false,
            message: "Error While Marking Lecture As Viewd!"
        })
    }
}

module.exports.getCurrentCourseProgress = async (req, res) => {
    try {

        const { userId, courseId } = req.params

        // console.log(userId, courseId)

        const studentPurchasedCourses = await studentCoursesSchema.findOne({ userId })

        // console.log(studentPurchasedCourses)

        const isCurrentCoursePurchasedByCurrentUserOrNot = studentPurchasedCourses?.courses?.findIndex(item => item.courseId === courseId) > -1

        // console.log(studentPurchasedCourses?.courses?.findIndex(item => item.courseId === courseId))

        // console.log(isCurrentCoursePurchasedByCurrentUserOrNot)

        if (!isCurrentCoursePurchasedByCurrentUserOrNot) {
            return res.status(200).json({
                success: true,
                data: {
                    isPurchased: false,
                },
                message: "You Need To Purchase This Course To Access It!"
            })
        }

        const currentUserCourseProgress = await courseProgressSchema.findOne({ userId, courseId })

        // console.log(currentUserCourseProgress)

        // console.log(currentUserCourseProgress?.lecturesProgress.length === 0)

        // const course = await courseSchema.findById(courseId)
        // console.log(course)
        if (!currentUserCourseProgress || currentUserCourseProgress?.lecturesProgress?.length === 0) {
            const course = await courseSchema.findById(courseId)

            // console.log(course)

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course Not Found!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "No Progress Found, You Can Start Watching The Course",
                data: {
                    courseDetails: course,
                    progress: [],
                    isPurchased: true,
                }
            })
        }

        const courseDetails = await courseSchema.findById(courseId)

        res.status(200).json({
            success: true,
            data: {
                courseDetails,
                progress: currentUserCourseProgress.lecturesProgress,
                completed: currentUserCourseProgress.completed,
                completionDate: currentUserCourseProgress.completionDate,
                isPurchased: true,
            }
        })

    } catch (error) {
        console.log("Error While Getting Course Progress Data!, ", error)
        res.status(500).json({
            success: false,
            message: "Error While Getting Course Progress Data!"
        })
    }
}

module.exports.resetCurrentCourseProgress = async (req, res) => {
    try {

        const { userId, courseId } = req.body

        const progress = await courseProgressSchema.findOne({ userId, courseId })

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: "Progress Not Found!"
            })
        }

        progress.lecturesProgress = []
        progress.completed = false
        progress.completionDate = null

        await progress.save()

        res.status(200).json({
            success: true,
            message: "Course Progress Has Been Reset",
            data: progress
        })

    } catch (error) {
        console.log("Error While Resetting Course Progress!, ", error)
        res.status(500).json({
            success: false,
            message: "Error While Resetting Course Progress!"
        })
    }
}