import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config/Config";
import { createContext, useState } from "react";


export const instructorContext = createContext(null)

export default function InstructorProvider({children}) {

    const [courseLandingFormData, setCourseLandingFormData] = useState(courseLandingInitialFormData)

    const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(courseCurriculumInitialFormData)

    const [mediaUploadProgress, setMediaUploadProgress] = useState(false)

    return <instructorContext.Provider
        value={{
            courseLandingFormData,
            setCourseLandingFormData,
            courseCurriculumFormData,
            setCourseCurriculumFormData,
            mediaUploadProgress,
            setMediaUploadProgress
        }}
    >
        {children}
    </instructorContext.Provider>
}