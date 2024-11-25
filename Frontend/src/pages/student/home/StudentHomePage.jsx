import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/auth-context/AuthContext'
import React, { useContext } from 'react'

function StudentHomePage() {
  const {resetCredentials} =useContext(AuthContext)

  const handleLogout = () => {
    resetCredentials()
    sessionStorage.clear()
  }

  return (
    <div>
      StudentHomePage

      <Button onClick={handleLogout}>LogOut</Button>
    </div>
  )
}

export default StudentHomePage
