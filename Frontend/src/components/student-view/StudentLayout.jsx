import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentHeader from './StudentHeader'

function StudentLayout() {
  return (
    <div>
      <StudentHeader/>
      <Outlet/>
    </div>
  )
}

export default StudentLayout
