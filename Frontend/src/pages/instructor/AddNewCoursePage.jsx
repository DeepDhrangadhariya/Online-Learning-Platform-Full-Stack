import CourseCurriculum from '@/components/instructor-view/courses/add-new-course/CourseCurriculum'
import CourseLanding from '@/components/instructor-view/courses/add-new-course/CourseLanding'
import CourseSettings from '@/components/instructor-view/courses/add-new-course/CourseSettings'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config/Config'
import { AuthContext } from '@/context/auth-context/AuthContext'
import { instructorContext } from '@/context/instructor-context/InstructorContext'
import { addNewCourseService, fetchInstructorCourseDetailsService, updateCourseByIdService } from '@/services/services'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddNewCoursePage = () => {

  const {
    courseCurriculumFormData,
    courseLandingFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId
  } = useContext(instructorContext)

  const { authState } = useContext(AuthContext)
  
  const navigate = useNavigate()

  const params = useParams()

  // console.log(params)

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0
    }

    return value === null || value === "" || value === undefined
  }

  function validateFormData() {

    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false
      }
    }

    let hasFreePreview = false

    for (const item of courseCurriculumFormData) {
      if (isEmpty(item.title) || isEmpty(item.videoUrl) || isEmpty(item.public_id)) {
        return false
      }

      if (item.freePreview) {
        hasFreePreview = true 
      }
    }

    return hasFreePreview && toast.info("Select At Least One Free Preview Lecture Before Submit")
  }

  async function handleCreateCourse() {
    const courseFinalFormdata = {
      instructorId: authState?.user?._id,
      instructorName: authState?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublised: true,
    }

    try {
      const response =
        currentEditedCourseId !== null ?
        await updateCourseByIdService(currentEditedCourseId, courseFinalFormdata) :
        await addNewCourseService(courseFinalFormdata)
  
      if (response?.success) {
        setCourseLandingFormData(courseLandingInitialFormData)
        setCourseCurriculumFormData(courseCurriculumInitialFormData)
        setCurrentEditedCourseId(null)
        toast.success(response.message)

        if (window.history.length > 1) {
          navigate(-1)
        } else {
          navigate('/instructor') // Fallback to a safe route
        }
  
        // navigate(-1)
        // navigate('/instructor')
        // navigate(back)
      }
      // console.log(window.history)
      // console.log("CourseFinalFormData, ", courseFinalFormdata)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  async function fetchCurrentCourseDetails() {
    try {
      const response = await fetchInstructorCourseDetailsService(currentEditedCourseId)
  
      if (response?.success) {
        const setCourseFormData = Object.keys(courseLandingInitialFormData).reduce((acc, key) => {
          acc[key] = response?.data[key] || courseLandingInitialFormData[key]
  
          return acc
        }, {})
  
        // console.log(setCourseFormData, response?.data)
  
        setCourseLandingFormData(setCourseFormData)
        setCourseCurriculumFormData(response?.data?.curriculum)
      }
  
      // console.log(response, "Response")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    // console.log(currentEditedCourseId)
    if(currentEditedCourseId !== null) fetchCurrentCourseDetails()
  },[currentEditedCourseId])

  useEffect(() => {
    if(params?.courseId) setCurrentEditedCourseId(params?.courseId)
  },[params?.courseId])

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-extrabold mb-5'>Create A New Course</h1>
        <Button
          disabled={!validateFormData()}
          className="text-sm tracking-wider font-bold px-8"
          onClick={handleCreateCourse}
        >SUBMIT</Button>
      </div>
      <Card>
        <CardContent>
          <div className='container mx-auto p-4'>
            <Tabs
              defaultValue='curriculum'
              className='space-y-4'
            >
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">Course Landing Page</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddNewCoursePage
