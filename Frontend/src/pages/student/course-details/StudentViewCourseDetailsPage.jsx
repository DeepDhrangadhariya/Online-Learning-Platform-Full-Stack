import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import VideoPlayer from "@/components/video-player/VideoPlayer"
import { AuthContext } from "@/context/auth-context/AuthContext"
import { StudentContext } from "@/context/student-context/StudentContext"
import { checkCoursePurchaseInfoService, createPaymentService, fetchStudentViewCourseDetailsService } from "@/services/services"
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"


const StudentViewCourseDetailsPage = () => {

    const {
        loadingState,
        setLoadingState,
        studentViewCourseDetails,
        setStudentViewCourseDetails,
        currentCourseDetailsId,
        setCurrentCourseDetailsId
    } = useContext(StudentContext)

    const { authState } = useContext(AuthContext)

    const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] = useState(null)

    const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false)

    const [approvalUrl, setApprovalUrl] = useState("")

    const navigate = useNavigate()

    const { id } = useParams()

    const location = useLocation()

    async function fetchStudentViewCourseDetails() {
        try {
            const checkCoursePurchaseInfoResponse = await checkCoursePurchaseInfoService(currentCourseDetailsId, authState?.user?._id)
    
            // console.log(checkCoursePurchaseInfoResponse)
    
            if (checkCoursePurchaseInfoResponse?.success && checkCoursePurchaseInfoResponse?.data) {
                navigate(`/course-progress/${currentCourseDetailsId}`)
                return
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
        
        try {
            const response = await fetchStudentViewCourseDetailsService(currentCourseDetailsId)
    
            if (response?.success) {
                setStudentViewCourseDetails(response?.data)
                setLoadingState(false)
                toast.info("Use This PayPal Account For Payment, Email: sb-lkjzy35346183@personal.example.com Password: Qj1q{H}+")
            } else {
                setStudentViewCourseDetails(null)
                setLoadingState(false)
            }
    
            // console.log(response)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    // console.log(id)

    function handleSetFreePreview(getCurrentVideoInfo) {
        // console.log(getCurrentVideoInfo)
        setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl)
    }

    async function handleCreatePayment() {
        const paymentPayload = {
            userId: authState?.user?._id,
            userName: authState?.user?.userName,
            userEmail: authState?.user?.userEmail,
            orderStatus: 'pending',
            paymentMethod: 'paypal',
            paymentStatus: 'initiated',
            orderDate: new Date(),
            paymentId: '',
            payerId: '',
            instructorId: studentViewCourseDetails?.instructorId,
            instructorName: studentViewCourseDetails?.instructorName,
            courseImage: studentViewCourseDetails?.image,
            courseTitle: studentViewCourseDetails?.title,
            courseId: studentViewCourseDetails?._id,
            coursePricing: studentViewCourseDetails?.pricing,
        }

        // console.log(paymentPayload)

        try {
            const response = await createPaymentService(paymentPayload)
    
            // console.log(response)
    
            if (response?.success) {
                sessionStorage.setItem('currentOrderId', JSON.stringify(response?.data?.orderId))
                setApprovalUrl(response?.data?.approveUrl)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }



    useEffect(() => {
        if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true)
    }, [displayCurrentVideoFreePreview])

    useEffect(() => {
        if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails()

        // console.log(currentCourseDetailsId)
    }, [currentCourseDetailsId])

    useEffect(() => {
        if (id) setCurrentCourseDetailsId(id)
    }, [id])

    useEffect(() => {
        if (!location.pathname.includes('courses/details')) (
            setStudentViewCourseDetails(null), setCurrentCourseDetailsId(null)
        )
    }, [location.pathname])

    if (loadingState) return <Skeleton />

    if (approvalUrl !== "") {
        window.location.href = approvalUrl
    }

    const getIndexOfFreePreviewUrl = studentViewCourseDetails !== null ?
        studentViewCourseDetails?.curriculum?.findIndex(item => item.freePreview) :
        -1

    return (
        <div className="mx-auto p-4">
            <div className="bg-gray-900 text-white p-8 rounded-t-lg">
                <h1 className="text-3xl font-bold mb-4">{studentViewCourseDetails?.title}</h1>
                <p className="text-xl mb-4">{studentViewCourseDetails?.subtitle}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                    <span>Created By {studentViewCourseDetails?.instructorName}</span>
                    <span>Created On {studentViewCourseDetails?.date.split('T')[0]}</span>
                    <span className="flex items-center">
                        <Globe className="mr-1 h-4 w-4" />
                        {studentViewCourseDetails?.primaryLanguage}
                    </span>
                    <span>{studentViewCourseDetails?.students.length} {studentViewCourseDetails?.students.length <= 1 ? 'Student' : 'Students'}</span>
                </div>
                <p className="text-xl mt-2">{studentViewCourseDetails?.welcomeMessage}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
                <main className="flex-grow">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>What You Will Learn</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {
                                    studentViewCourseDetails?.objectives.split(',').map((objective, index) =>
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                                            <span>{objective}</span>
                                        </li>
                                    )
                                }
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Course Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {
                                studentViewCourseDetails?.description
                            }
                        </CardContent>
                    </Card>
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Course Curriculum</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {
                                studentViewCourseDetails?.curriculum?.map((curriculumItem, index) => (
                                    <li
                                        className={`${curriculumItem?.freePreview ?
                                            'cursor-pointer' :
                                            'cursor-not-allowed'
                                            } flex items-center mb-4`}
                                        key={index}
                                        onClick={curriculumItem?.freePreview ?
                                            () => handleSetFreePreview(curriculumItem) : null}>
                                        {
                                            curriculumItem?.freePreview ?
                                                <PlayCircle className="mr-2 h-4 w-4" /> :
                                                <Lock className="mr-2 h-4 w-4" />
                                        }
                                        <span>{curriculumItem?.title}</span>
                                    </li>
                                ))
                            }
                        </CardContent>
                    </Card>
                </main>
                <aside className="w-full md:w-[500px]">
                    <Card className="sticky top-4">
                        <CardContent className="p-6">
                            <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                                <VideoPlayer
                                    url={
                                        getIndexOfFreePreviewUrl !== -1 ?
                                            studentViewCourseDetails?.curriculum[getIndexOfFreePreviewUrl].videoUrl :
                                            ''
                                    }
                                    width="450px"
                                    height="200px"
                                />
                            </div>
                            <div className="mb-4">
                                <span className="text-3xl font-bold">${studentViewCourseDetails?.pricing}</span>
                            </div>
                            <Button onClick={handleCreatePayment} className="w-full">
                                Buy Now
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
            <Dialog open={showFreePreviewDialog} onOpenChange={() => {
                setShowFreePreviewDialog(false)
                setDisplayCurrentVideoFreePreview(null)
            }}>
                <DialogContent>
                    <DialogHeader className="sm:max-w-md">
                        <DialogTitle>Course Preview</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video rounded-lg flex items-center justify-center">
                        <VideoPlayer
                            url={displayCurrentVideoFreePreview}
                            width="450px"
                            height="200px"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        {
                            studentViewCourseDetails?.curriculum?.filter(item => item.freePreview).map((filterdItem, index) =>
                                <p
                                    key={index}
                                    className="cursor-pointer text-[16px] font-medium"
                                    onClick={() => handleSetFreePreview(filterdItem)}
                                >
                                    {filterdItem?.title}
                                </p>)
                        }
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default StudentViewCourseDetailsPage