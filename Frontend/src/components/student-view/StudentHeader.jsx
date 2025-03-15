import { GraduationCap, TvMinimalPlay } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useContext } from "react"
import { AuthContext } from "@/context/auth-context/AuthContext"


const StudentHeader = () => {

    const navigate = useNavigate()

    const { resetCredentials } = useContext(AuthContext)

    function handleLogout() {
        resetCredentials()
        sessionStorage.clear()
    }

    return (
        <header className="flex items-center justify-between p-4 border-b gap-4 relative">
            <div className="flex items-center md:gap-2">
                <Link to='/home' className="flex items-center hover:text-black md:gap-2">
                    <GraduationCap className="h-8 w-8"/>
                    <span className="font-extrabold md:text-xl text-[8px] text-center">Online Learning Platform</span>
                </Link>
                <div className="flex items-center space-x-1">
                    <Button variant="ghost" onClick={()=>{location.pathname.includes('/courses') ? null : navigate('/courses')}} className="text-[8px] md:text-[16px] font-medium text-center">
                        Explore Courses
                    </Button>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex gap-4 items-center">
                    <div onClick={() => navigate('/student-courses')} className="flex cursor-pointer items-center gap-3">
                        <span className="font-extrabold md:text-xl text-[8px]">My Courses</span>
                        <TvMinimalPlay className="w-5 h-5 cursor-pointer" />
                    </div>
                    <Button className="text-xs" onClick={handleLogout}>Sign Out</Button>
                </div>
            </div>
        </header>
    )
}

export default StudentHeader