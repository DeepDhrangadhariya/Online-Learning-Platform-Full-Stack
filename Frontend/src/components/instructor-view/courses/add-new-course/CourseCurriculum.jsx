import MediaProgressBar from '@/components/media-progress-bar/MediaProgressBar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import VideoPlayer from '@/components/video-player/VideoPlayer'
import { courseCurriculumInitialFormData } from '@/config/Config'
import { instructorContext } from '@/context/instructor-context/InstructorContext'
import { mediaBulkUploadService, mediaDeleteService, mediaUploadService } from '@/services/services'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Upload } from 'lucide-react'
import React, { useContext, useRef } from 'react'

const CourseCurriculum = () => {

    const {
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercentage,
        setMediaUploadProgressPercentage
    } = useContext(instructorContext)

    const bulkUploadInputRef = useRef(null)

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
        const selectedFiles = event.target.files[0]

        if (selectedFiles) {
            const videoFormData = new FormData()
            videoFormData.append('file', selectedFiles)
            try {
                setMediaUploadProgress(true)
                const response = await mediaUploadService(videoFormData, setMediaUploadProgressPercentage)

                if (response.success) {
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

    async function handleReplaceVideo(currentIndex) {
        let copyCourseCurriculumFormData = [...courseCurriculumFormData]
        const getCurrentVideoPublicId = copyCourseCurriculumFormData[currentIndex].public_id

        const deleteCurrentMediaResponse = await mediaDeleteService(getCurrentVideoPublicId)

        if (deleteCurrentMediaResponse?.success) {
            copyCourseCurriculumFormData[currentIndex] = {
                ...copyCourseCurriculumFormData[currentIndex],
                videoUrl: '',
                public_id: ''
            }
            setCourseCurriculumFormData(copyCourseCurriculumFormData)
        }
    }

    function isCourseCurriculumFormDataValid() {
        return courseCurriculumFormData.every((item) => {
            return (
                item &&
                typeof item === "object" &&
                typeof item.title === "string" &&
                item.title.trim() !== "" &&
                typeof item.videoUrl === "string" &&
                item.videoUrl.trim() !== ""
            );
        })
    }

    function handleOpenBulkUploadDialog() {
        bulkUploadInputRef.current?.click()
    }

    function areAllCourseCurriculumFormDataObjectsEmpty(arr) {
        return arr.every((obj) => {
            return Object.entries(obj).every(([key, value]) => {
                if (typeof value === 'boolean') {
                    return true
                }
                return value === ''
            })
        })
    }

    async function handleMediaBulkUpload(event) {
        const selectedFiles = Array.from(event.target.files)
        const bulkFormData = new FormData()

        selectedFiles.forEach(fileItem => bulkFormData.append('files', fileItem))

        try {
            setMediaUploadProgress(true)
            const response = await mediaBulkUploadService(bulkFormData, setMediaUploadProgressPercentage)

            console.log("Bulk Response", response)

            if (response?.success) {
                let copyCourseCurriculumFormData = areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)
                    ? [] :
                    [...courseCurriculumFormData]
                
                copyCourseCurriculumFormData = [
                    ...copyCourseCurriculumFormData,
                    ...response?.data.map((item, index) => ({
                        videoUrl: item?.url,
                        public_id: item?.public_id,
                        title: `Lecture ${copyCourseCurriculumFormData.length + (index + 1)}`,
                        freePreview: false
                    }))
                ]

                setCourseCurriculumFormData(copyCourseCurriculumFormData)
                setMediaUploadProgress(false)


                console.log(courseCurriculumFormData, "copyCourseCurriculumFormData", copyCourseCurriculumFormData)
            }

        } catch (error) {
            console.log(error)
        }

        console.log(selectedFiles)
    }

    // console.log(courseCurriculumFormData)

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>Create Course Curriculum</CardTitle>
                <div>
                    <Input
                        type="file"
                        ref={bulkUploadInputRef}
                        accept="video/*"
                        multiple
                        className="hidden"
                        id="bulk-media-upload"
                        onChange={handleMediaBulkUpload}
                    />
                    <Button
                        as="label"
                        htmlFor="bulk-media-upload"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={handleOpenBulkUploadDialog}
                    >
                        <Upload className='w-4 h-5 mr-2' />
                        Bulk Upload
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Button disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress} onClick={handleNewLecture}>Add Lecture</Button>
                {
                    mediaUploadProgress ?
                        <MediaProgressBar
                            isMediaUploading={mediaUploadProgress}
                            progress={mediaUploadProgressPercentage}
                        /> : null
                }
                <div className='mt-4 space-y-4'>
                    {
                        courseCurriculumFormData.map((curriculumItem, index) => (
                            <div className='border p-5 rounded-md' key={index}>
                                <div className='flex gap-5 items-center'>
                                    <h3 className='font-semibold'> Lectures {index + 1}</h3>
                                    <Input
                                        name={`title-${index + 1}`}
                                        placeholder="Enter Lecture Title"
                                        className="max-w-96"
                                        onChange={event => handleCourseTitleChange(event, index)}
                                        value={courseCurriculumFormData[index]?.title}
                                    />
                                    <div className='flex items-center space-x-2'>
                                        <Switch
                                            onCheckedChange={(value) => handleFreePreviewChange(value, index)}
                                            checked={courseCurriculumFormData[index]?.freePreview}
                                            id={`freePreview-${index + 1}`}
                                        />
                                        <Label htmlFor={`freePreview-${index + 1}`} className="cursor-pointer">
                                            Free Preview
                                        </Label>
                                    </div>
                                </div>
                                <div className='mt-6'>
                                    {
                                        courseCurriculumFormData[index]?.videoUrl ?
                                            <div className='flex gap-3'>
                                                <VideoPlayer
                                                    url={courseCurriculumFormData[index]?.videoUrl}
                                                    width='400px'
                                                    height='200px'
                                                />
                                                <Button onClick={() => handleReplaceVideo(index)} >Replace Video</Button>
                                                <Button className="bg-red-900">Delete Lecture</Button>
                                            </div> :
                                            <Input
                                                type="file"
                                                accept="video/*"
                                                onChange={event => handleSingleLectureUpload(event, index)}
                                                className="mb-4"
                                            />
                                    }
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
