import MediaProgressBar from '@/components/media-progress-bar/MediaProgressBar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { courseCurriculumInitialFormData } from '@/config/Config'
import { instructorContext } from '@/context/instructor-context/InstructorContext'
import { mediaUploadService } from '@/services/services'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useContext } from 'react'

const CourseCurriculum = () => {

    const {
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercentage,
        setMediaUploadProgressPercentage
    } = useContext(instructorContext)

    function handleNewLecture() {
        setCourseCurriculumFormData([
            ...courseCurriculumFormData,
            {
                ...courseCurriculumInitialFormData
            }
        ])
    }

    function handleCourseTitleChange(event, currentIndex) {
        let copyCourseCurriculumFormData = [...courseCurriculumFormData]
        // console.log(copyCourseCurriculumFormData)
        copyCourseCurriculumFormData[currentIndex] = {
            ...copyCourseCurriculumFormData[currentIndex],
            title: event.target.value
        }

        setCourseCurriculumFormData(copyCourseCurriculumFormData)
    }

    function handleFreePreviewChange(currentValue, currentIndex) {
        // console.log(currentValue, currentIndex)
        let copyCourseCurriculumFormData = [...courseCurriculumFormData]
        copyCourseCurriculumFormData[currentIndex] = {
            ...copyCourseCurriculumFormData[currentIndex],
            freePreview: currentValue
        }
        // console.log(copyCourseCurriculumFormData)
        setCourseCurriculumFormData(copyCourseCurriculumFormData)
    }

    async function handleSingleLectureUpload(event, currentIndex) {
        // console.log(event.target.files)
        const selectedFiles= event.target.files[0]

        if(selectedFiles) {
            const videoFormData = new FormData()
            videoFormData.append('file', selectedFiles)
            try {
                setMediaUploadProgress(true)
                const response = await mediaUploadService(videoFormData, setMediaUploadProgressPercentage)

                if(response.success) {
                    let copyCourseCurriculumFormData = [...courseCurriculumFormData]
                    copyCourseCurriculumFormData[currentIndex] = {
                        ...copyCourseCurriculumFormData[currentIndex],
                        videoUrl: response?.data?.url,
                        public_id: response?.data?.public_id
                    }
                    setCourseCurriculumFormData(copyCourseCurriculumFormData)
                    setMediaUploadProgress(false)
                }

                // console.log(response, 'response')
            } catch (error) {
                console.log(error)
            }
        }

    }

    console.log(courseCurriculumFormData)

  return (
    <Card>
        <CardHeader>
            <CardTitle>Create Course Curriculum</CardTitle>
        </CardHeader>
        <CardContent>
            <Button onClick={handleNewLecture}>Add Lecture</Button>
            {
                mediaUploadProgress ?
                <MediaProgressBar
                isMediaUploading={mediaUploadProgress}
                progress={mediaUploadProgressPercentage}
                /> : null
            }
            <div className='mt-4 space-y-4'>
                {
                    courseCurriculumFormData.map((curriculumItem, index)=> (
                        <div className='border p-5 rounded-md' key={index}>
                            <div className='flex gap-5 items-center'>
                                <h3 className='font-semibold'> Lectures {index + 1}</h3>
                                <Input
                                name={`title-${index + 1}`}
                                placeholder="Enter Lecture Title"
                                className="max-w-96"
                                onChange={event=> handleCourseTitleChange(event, index)}
                                value={courseCurriculumFormData[index]?.title}
                                />
                                <div className='flex items-center space-x-2'>
                                    <Switch
                                    onCheckedChange={(value)=> handleFreePreviewChange(value, index)}
                                    checked={courseCurriculumFormData[index]?.freePreview}
                                    id={`freePreview-${index + 1}`}
                                    />
                                    <Label htmlFor={`freePreview-${index + 1}`} className="cursor-pointer">
                                        Free Preview
                                    </Label>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <Input
                                type="file"
                                accept="video/*"
                                onChange={event=> handleSingleLectureUpload(event, index)}
                                className="mb-4"
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </CardContent>
    </Card>
  )
}

export default CourseCurriculum
