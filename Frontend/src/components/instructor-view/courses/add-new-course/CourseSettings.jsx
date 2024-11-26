import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { instructorContext } from '@/context/instructor-context/InstructorContext'
import { mediaUploadService } from '@/services/services'
import React, { useContext } from 'react'

const CourseSettings = () => {

  const {courseLandingFormData, setCourseLandingFormData} = useContext(instructorContext)

  async function handleImageUploadChange(event) {
    const selectedImage = event.target.files[0]

    if(selectedImage) {
      const imageFormData = new FormData()
      imageFormData.append('file', selectedImage)

      try {
        const response = await mediaUploadService(imageFormData)
        console.log(response, 'response')

        if(response.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response?.data?.url
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  console.log(courseLandingFormData)

  return (
    <Card>
        <CardHeader>
            <CardTitle>Course Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {
            courseLandingFormData?.image ?

            <img src={courseLandingFormData?.image} alt="" /> :

            <div className='flex flex-col gap-3'>
                <Label>Upload Course Image</Label>
                <Input
                onChange={handleImageUploadChange}
                type='file'
                accept='image/*'
                className="cursor-pointer"
                />
            </div>
          }
        </CardContent>
    </Card>
  )
}

export default CourseSettings
