import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/auth/AuthPage'
import ProtectedRoutes from './components/protected-routes/ProtectedRoutes'
import { useContext } from 'react'
import { AuthContext } from './context/auth-context/AuthContext'
import InstructorDashboard from './pages/instructor/InstructorDashboard'
import StudentLayout from './components/student-view/StudentLayout'
import StudentHomePage from './pages/student/home/StudentHomePage'

function App() {

  const {authState} = useContext(AuthContext)

  return (
    <>
      <Routes>
        <Route
        path='/auth'
        element={
          <ProtectedRoutes
          element={<AuthPage/>}
          authenticated={authState?.authenticate}
          user={authState?.user}
          />
        }
        />
        <Route
        path='/instructor'
        element={
          <ProtectedRoutes
          element={<InstructorDashboard/>}
          authenticated={authState?.authenticate}
          user={authState?.user}
          />
        }
        />
        <Route
        path='/'
        element={
          <ProtectedRoutes
          element={<StudentLayout/>}
          authenticated={authState?.authenticate}
          user={authState?.user}
          />
        }
        >
          <Route path='' element={<StudentHomePage/>} />
          <Route path='/home' element={<StudentHomePage/>} />
        </Route>
      </Routes>
      
    </>
  )
}

export default App
