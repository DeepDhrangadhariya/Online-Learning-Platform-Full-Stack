import FormControls from '@/components/common-form/FormControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { courseLangingPageFormControls } from '@/config/Config'
import { instructorContext } from '@/context/instructor-context/InstructorContext'
import React, { useContext } from 'react'

const CourseLanding = () => {

    const {courseLandingFormData, setCourseLandingFormData} = useContext(instructorContext)

  return (

    <Card>
        <CardHeader>
            <CardTitle>Course Landing Page</CardTitle>
        </CardHeader>
        <CardContent>
            <FormControls 
            formControls={courseLangingPageFormControls}
            formData={courseLandingFormData}
            setFormData={setCourseLandingFormData}
            />
        </CardContent>
    </Card>
  )
}

export default CourseLanding
