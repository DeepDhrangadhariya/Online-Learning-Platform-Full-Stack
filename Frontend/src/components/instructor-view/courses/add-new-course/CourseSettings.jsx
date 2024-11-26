import MediaProgressBar from '@/components/media-progress-bar/MediaProgressBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { instructorContext } from '@/context/instructor-context/InstructorContext'
import { mediaUploadService } from '@/services/services'
import React, { useContext } from 'react'

const CourseSettings = () => {

  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage
  } = useContext(instructorContext)

  async function handleImageUploadChange(event) {
    const selectedImage = event.target.files[0]

    if(selectedImage) {
      const imageFormData = new FormData()
      imageFormData.append('file', selectedImage)

      try {

        setMediaUploadProgress(true)

        const response = await mediaUploadService(imageFormData, setMediaUploadProgressPercentage)
        console.log(response, 'response')

        if(response.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response?.data?.url
          })

          setMediaUploadProgress(false)
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
        {/* <div className='p-4'> */}
        {
          mediaUploadProgress ?
          <MediaProgressBar
          isMediaUploading={mediaUploadProgress}
          progress={mediaUploadProgressPercentage}
          /> : null
        }
        {/* </div> */}
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
