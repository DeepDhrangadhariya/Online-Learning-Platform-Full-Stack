import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config/Config'
import { instructorContext } from '@/context/instructor-context/InstructorContext'
import { deleteCourseByIdService } from '@/services/services'
import { Edit, Trash2 } from 'lucide-react'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const InstructorCourses = ({ listOfCourses }) => {

    const navigate = useNavigate()

    const { instructorCoursesList, setInstructorCoursesList, setCurrentEditedCourseId, setCourseLandingFormData, setCourseCurriculumFormData } = useContext(instructorContext)
    
    // console.log(instructorCoursesList)

    async function handleDeleteCourse(currentIndex) {
        // console.log(instructorCoursesList)


        let courseToDelete = instructorCoursesList[currentIndex]
        // const courseDeleteId = courseToDelete._id
        // const allCourse = [...courseToDelete.curriculum]
        // const cId = allCourse.map(id => {console.log(id.public_id)})
        
        // console.log(courseDeleteId)
        // console.log(cId)
        
        if (!courseToDelete) {
            console.log("Course Not Found")
        }
        
        const confirmation = window.confirm(
            `Are you sure you want to delete the course: "${courseToDelete.title}"?`
        );
        
        if (!confirmation) return;
        
        let copyinstructionCoursesList = [...instructorCoursesList]

        // console.log(courseToDelete._id)
        // console.log(copyinstructionCoursesList)

        try {
            const response = await deleteCourseByIdService(courseToDelete._id);
    
            if (response?.success) {
                copyinstructionCoursesList = copyinstructionCoursesList.filter((_, index) => index !== currentIndex)
    
                setInstructorCoursesList(copyinstructionCoursesList)
                toast.success(response.message)
            }
    
            // console.log(courseToDelete?.curriculum?.public_id)
            // console.log(courseCurriculumFormData)
        } catch (error) {
            toast(error.response.data.message)
        }

    }
    
    async function handleDeleteLecture(currentIndex) {
            let copyCourseCurriculumFormData = [...courseCurriculumFormData]
        const getCurrentSelectedVideoPublicId = copyCourseCurriculumFormData[currentIndex].public_id
        
        try {
            const response = await mediaDeleteService(getCurrentSelectedVideoPublicId)
    
            if (response?.success) {
                copyCourseCurriculumFormData = copyCourseCurriculumFormData.filter((_, index) => index !== currentIndex)
    
                setCourseCurriculumFormData(copyCourseCurriculumFormData)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

            // console.log("copyCourseCurriculumFormData, ", copyCourseCurriculumFormData[currentIndex])
        }

    return (
        <Card>
            <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
                <Button
                    className="p-6"
                    onClick={() => navigate('/instructor/create-new-course')}
                >
                    Create New Course
                </Button>
            </CardHeader>
            <CardContent>
                <div className='overflow-x-auto'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead>Students</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                listOfCourses && listOfCourses.length > 0 ?
                                    listOfCourses.map((course, index) =>

                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                {course?.title || "React JS Full Course 2025"}
                                            </TableCell>
                                            <TableCell>{course?.students?.length}</TableCell>
                                            <TableCell>${course?.students?.length * course?.pricing}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setCurrentEditedCourseId(null)
                                                        setCourseLandingFormData(courseLandingInitialFormData)
                                                        setCourseCurriculumFormData(courseCurriculumInitialFormData)
                                                        navigate(`/instructor/edit-course/${course?._id}`)
                                                    }}
                                                >
                                                    <Edit className='h-6 w-6' />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteCourse(index)}
                                                >
                                                    <Trash2 className='h-6 w-6' />
                                                </Button>
                                            </TableCell>
                                        </TableRow>

                                    ) : null
                            }
                        </TableBody>
                    </Table>

                </div>
            </CardContent>
        </Card>
    )
}

export default InstructorCourses
