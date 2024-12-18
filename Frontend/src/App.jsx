import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/auth/AuthPage'
import ProtectedRoutes from './components/protected-routes/ProtectedRoutes'
import { useContext } from 'react'
import { AuthContext } from './context/auth-context/AuthContext'
import InstructorDashboardPage from './pages/instructor/InstructorDashboardPage'
import StudentLayout from './components/student-view/StudentLayout'
import StudentHomePage from './pages/student/home/StudentHomePage'
import NotFoundPage from './pages/not-found/NotFoundPage'
import AddNewCoursePage from './pages/instructor/AddNewCoursePage'
import StudentViewCoursesPage from './pages/student/courses/StudentViewCoursesPage'

function App() {

  const { authState } = useContext(AuthContext)

  return (
    <>
      <Routes>
        <Route
          path='/auth'
          element={
            <ProtectedRoutes
              element={<AuthPage />}
              authenticated={authState?.authenticate}
              user={authState?.user}
            />
          }
        />
        <Route
          path='/instructor'
          element={
            <ProtectedRoutes
              element={<InstructorDashboardPage />}
              authenticated={authState?.authenticate}
              user={authState?.user}
            />
          }
        />
        <Route
          path='/instructor/create-new-course'
          element={
            <ProtectedRoutes
              element={<AddNewCoursePage />}
              authenticated={authState?.authenticate}
              user={authState?.user}
            />
          }
        />
        <Route
          path='/instructor/edit-course/:courseId'
          element={
            <ProtectedRoutes
              element={<AddNewCoursePage />}
              authenticated={authState?.authenticate}
              user={authState?.user}
            />
          }
        />
        <Route
          path='/'
          element={
            <ProtectedRoutes
              element={<StudentLayout />}
              authenticated={authState?.authenticate}
              user={authState?.user}
            />
          }
        >
          <Route path='' element={<StudentHomePage />} />
          <Route path='home' element={<StudentHomePage />} />
          <Route path='courses' element={<StudentViewCoursesPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </>
  )
}

export default App
