import InstructorCourses from '@/components/instructor-view/courses/InstructorCourses'
import InstructorDashboard from '@/components/instructor-view/dashboard/InstructorDashboard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { AuthContext } from '@/context/auth-context/AuthContext'
import { instructorContext } from '@/context/instructor-context/InstructorContext'
import { fetchInstructorCourseListService } from '@/services/services'
import { BarChart, Book, LogOut } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'


function InstructorDashboardPage() {
  
  const [activeTab, setActiveTab] = useState('dashboard')
  const { resetCredentials } = useContext(AuthContext)
  const {authState} = useContext(AuthContext)
  const {instructorCoursesList, setInstructorCoursesList} = useContext(instructorContext)

  async function fetchAllCourses() {
    try {
      const response = await fetchInstructorCourseListService()
  
      // console.log(authState.user._id)
  
      // console.log(response)
  
      if (response?.success) {
        const filteredCourses = response?.data?.filter(
          (item) => item.instructorId === authState.user._id
        )
        // console.log(filteredCourses)
        setInstructorCoursesList(filteredCourses)
      }
  
      //   if (response?.success) {
      //   setInstructorCoursesList(response?.data)
      // }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchAllCourses()
  },[])

  const menuItems = [
    {
      icon: BarChart,
      label: 'Dashboard',
      value: 'dashboard',
      component: <InstructorDashboard listOfCourses={instructorCoursesList} />
    },
    {
      icon: Book,
      label: 'Courses',
      value: 'courses',
      component: <InstructorCourses listOfCourses={instructorCoursesList} />
    },
    {
      icon: LogOut,
      label: 'Logout',
      value: 'logout',
      component: null
    }
  ]

  const handleLogout = () => {
    resetCredentials()
    sessionStorage.clear()
  }

  return (
    <div className='flex h-full min-h-screen bg-gray-100'>
      <aside className='w-12 md:w-64 bg-white shadow-md md:block'>
        <div className="p-2 md:p-4">
          <h2 className='hidden md:block md:text-2xl font-bold mb-4'>Instructor View</h2>
          <nav>
            {
              menuItems.map(menuItem=><Button
              className="w-full justify-start mb-2"
              key={menuItem.value}
              variant={activeTab === menuItem.value ? 'secondary' : 'ghost'}
              onClick={menuItem.value === 'logout' ?
                handleLogout : ()=>setActiveTab(menuItem.value)
              }
              >
                <menuItem.icon className='ml-[-5px] md:ml-0 mr-2 h-4 w-4' />
                <span className='hidden md:block'>{menuItem.label}</span>
              </Button>)
            }
          </nav>
        </div>
      </aside>
      <main className='flex-1 p-8 overflow-y-auto'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold mb-8'>
            Dashboard
          </h1>
          <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          >
            {
              menuItems.map(menuItem=><TabsContent
              key={menuItem.value}
              value={menuItem.value}
              >
                {
                  menuItem.component !== null ? 
                  menuItem.component :
                  null
                }
              </TabsContent>)
            }
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default InstructorDashboardPage
