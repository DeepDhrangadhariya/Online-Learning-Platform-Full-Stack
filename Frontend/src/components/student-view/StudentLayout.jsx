import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import StudentHeader from './StudentHeader'

function StudentLayout() {

  const location = useLocation()

  return (
    <div>
      {
        !location.pathname.includes('course-progress') ?
          <StudentHeader /> :
          null
      }
      <Outlet />
    </div>
  )
}

export default StudentLayout
