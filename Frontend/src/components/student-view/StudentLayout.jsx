import React from 'react'
import { Outlet } from 'react-router-dom'

function StudentLayout() {
  return (
    <div>
      StudentLayout
      <Outlet/>
    </div>
  )
}

export default StudentLayout
