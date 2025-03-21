import React, { useContext, useEffect } from 'react'
import banner from '../../../assets/banner-img.png'
import { courseCategories } from '@/config/Config'
import { Button } from '@/components/ui/button'
import { StudentContext } from '@/context/student-context/StudentContext'
import { checkCoursePurchaseInfoService, fetchStudentViewCourseListService } from '@/services/services'
import { AuthContext } from '@/context/auth-context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function StudentHomePage() {

  const { studentViewCoursesList, setStudentViewCoursesList } = useContext(StudentContext)

  const { authState } = useContext(AuthContext)
  
  const navigate = useNavigate()

  function handleNavigateToCoursesPage(getCurrentId) {
    // console.log(getCurrentId)
    sessionStorage.removeItem('filters')
    const currentFilter = {
      category: [getCurrentId]
    }

    sessionStorage.setItem('filters', JSON.stringify(currentFilter))

    navigate('/courses')
  }

  async function fetchAllStudentViewCourses() {
    try {
      const response = await fetchStudentViewCourseListService()
  
      if (response?.success) {
        setStudentViewCoursesList(response?.data)
      }
  
      // console.log(response)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    try {
      const response = await checkCoursePurchaseInfoService(getCurrentCourseId, authState?.user?._id)
  
      if (response?.success) {
        if (response?.data) {
          navigate(`/course-progress/${getCurrentCourseId}`)
        } else {
          navigate(`/courses/details/${getCurrentCourseId}`)
        }
      }
  
      // console.log(response)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  
  useEffect(() => {
    fetchAllStudentViewCourses()
  },[])

  return (
    <div className='min-h-screen bg-white'>
      <section className='flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8'>
        <div className='lg:w-1/2 lg:pr-12'>
          <h1 className='text-4xl font-bold mb-4'>Learning That Gets You</h1>
          <p className='text-xl'>Skills For Your Present And Your Future. Get Started With Us</p>
        </div>
        <div className='lg:w-full mb-8 lg:mb-0'>
          <img
            src={banner}
            width={600}
            height={400}
            className='w-full h-auto rounded-lg shadow-lg'
            alt=""
          />
        </div>
      </section>
      <section className='py-8 px-4 lg:px-8 bg-gray-100'>
        <h2 className='text-2xl font-bold mb-6'>Course Categories</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {
            courseCategories.map(categoryItem =>
              <Button
                className="justify-start"
                variant="outline"
                key={categoryItem.id}
                onClick={()=>handleNavigateToCoursesPage(categoryItem.id)}
              >
                {categoryItem.label}
              </Button>
            )
          }
        </div>
      </section>
      <section className='py-12 px-4 lg:px-8'>
        <h2 className='text-2xl font-bold mb-6'>Featured Courses</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {
            studentViewCoursesList && studentViewCoursesList.length > 0 ?
              studentViewCoursesList.map((courseItem, index) => <div onClick={()=>handleCourseNavigate(courseItem?._id)} className='border rounded-lg overflow-hidden shadow cursor-pointer' key={index}>
                <img
                  src={courseItem?.image}
                  width={300}
                  height={150}
                  className='w-full h-40 object-cover' 
                  alt=""
                />
                <div className='p-4'>
                  <h3 className='font-bold mb-2'>{courseItem?.title}</h3>
                  <p className='text-sm text-gray-700 mb-2'>{courseItem?.instructorName}</p>
                  <p className='font-bold text-[16px}'>${courseItem?.pricing}</p>
                </div>
              </div>) :
              <h1 className="font-extrabold text-4xl">No Courses Found</h1>
          }
        </div>
      </section>
    </div>
  )
}

export default StudentHomePage
