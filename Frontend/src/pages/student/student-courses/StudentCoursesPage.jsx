import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AuthContext } from "@/context/auth-context/AuthContext"
import { StudentContext } from "@/context/student-context/StudentContext"
import { fetchStudentBoughtCoursesService } from "@/services/services"
import { Watch } from "lucide-react"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const StudentCoursesPage = () => {

    const { authState } = useContext(AuthContext)

    const {
        loadingState,
        setLoadingState,
        studentBoughtCoursesList,
        setStudentBoughtCoursesList
    } = useContext(StudentContext)

    const navigate = useNavigate()

    async function fetchStudentBoughtCourses() {
        try {
            const response = await fetchStudentBoughtCoursesService(authState?.user?._id)
    
            if (response?.success) {
                setStudentBoughtCoursesList(response?.data)
                setLoadingState(false)
    
                // console.log(response)
                // console.log(response.success)
                // console.log(response.data)
            } else {
                setLoadingState(false)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        fetchStudentBoughtCourses()
    }, [])

    // console.log(studentBoughtCoursesList)

    if (loadingState) return <Skeleton />

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-8">My Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ?
                        studentBoughtCoursesList.map((course, index) =>
                            <Card key={index} className="flex flex-col">
                                <CardContent className="p-4 flex-grow">
                                    <img
                                        src={course?.courseImage}
                                        alt={course?.title}
                                        className="h-52 w-full object-cover rounded-md mb-4"
                                    />
                                    <h3 className="font-bold mb-1">{course?.title}</h3>
                                    <p className="text-sm text-gray-700 mb-2">{course?.instructorName}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={()=>navigate(`/course-progress/${course?.courseId}`)} className="flex-1">
                                        <Watch className="mr-2 h-4 w-4" />
                                        Start Watching
                                    </Button>
                                </CardFooter>
                            </Card>
                        ) : loadingState ? <Skeleton /> :
                        <h1 className="text-3xl font-bold">No Courses Found</h1>
                }
            </div>
        </div>
    )
}

export default StudentCoursesPage