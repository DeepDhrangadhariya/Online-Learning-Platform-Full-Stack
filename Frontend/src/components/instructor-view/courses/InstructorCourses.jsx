import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Trash2 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const InstructorCourses = ({ listOfCourses }) => {

    const navigate = useNavigate()

    return (
        <Card>
            <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
                <Button
                    className="p-6"
                    onClick={() => navigate('/instructor/create-new-course')}
                >
                    Create New Course
                </Button>
            </CardHeader>
            <CardContent>
                <div className='overflow-x-auto'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead>Students</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                listOfCourses && listOfCourses.length > 0 ?
                                    listOfCourses.map((course, index) =>

                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                {course?.title || "React JS Full Course 2025"}
                                            </TableCell>
                                            <TableCell>{course?.students?.length || 1111}</TableCell>
                                            <TableCell>${course?.pricing || 5000}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <Edit className='h-6 w-6' />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <Trash2 className='h-6 w-6' />
                                                </Button>
                                            </TableCell>
                                        </TableRow>

                                    ) : null
                            }
                        </TableBody>
                    </Table>

                </div>
            </CardContent>
        </Card>
    )
}

export default InstructorCourses
