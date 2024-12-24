const paypal = require('../../helpers/paypal')
const orderSchema = require('../../model/orderSchema')
const courseSchema = require("../../model/courseSchema")
const studentCoursesSchema = require("../../model/studentCoursesSchema")

module.exports.createOrder = async (req, res) => {
    try {

        const {
            userId,
            userName,
            userEmail,
            orderStatus,
            paymentMethod,
            paymentStatus,
            orderDate,
            paymentId,
            payerId,
            instructorId,
            instructorName,
            courseImage,
            courseTitle,
            courseId,
            coursePricing
        } = req.body

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_URL}/payment-return`,
                cancel_url: `${process.env.CLIENT_URL}/payment-cancel`
            },
            transactions: [
                {
                    item_list: {
                        items: [
                            {
                                name: courseTitle,
                                sku: courseId,
                                price: coursePricing,
                                currency: 'USD',
                                quantity: 1
                            }
                        ]
                    },
                    amount: {
                        currency: 'USD',
                        total: coursePricing.toFixed(2)
                    },
                    description: courseTitle
                }
            ]
        }

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log("Error While Creating Paypal Payment!, ", error)
                return res.status(500).json({
                    success: false,
                    message: "Error While Creating Paypal Payment!"
                })
            } else {
                const newlyCreatedCourseOrder = new orderSchema({
                    userId,
                    userName,
                    userEmail,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    orderDate,
                    paymentId,
                    payerId,
                    instructorId,
                    instructorName,
                    courseImage,
                    courseTitle,
                    courseId,
                    coursePricing
                })

                await newlyCreatedCourseOrder.save()

                const approveUrl = paymentInfo.links.find(link => link.rel == 'approval_url').href

                // console.log("newlyCreatedCourseOrder, ", newlyCreatedCourseOrder)

                res.status(201).json({
                    success: true,
                    message: "Order Created",
                    data: {
                        approveUrl,
                        orderId: newlyCreatedCourseOrder._id
                    }
                })
            }
        })

    } catch (error) {
        console.log("Error While Creating Order!, ", error)
        res.status(500).json({
            success: false,
            message: 'Error While Creating Order!',
            error: error
        })
    }
}

module.exports.capturePaymentAndFinalizeOrder = async (req, res) => {
    try {

        const { paymentId, payerId, orderId } = req.body

        let order = await orderSchema.findById(orderId)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Can Not Be Found!"
            })
        }

        order.paymentStatus = 'paid'
        order.orderStatus = 'confirmed'
        order.paymentId = paymentId
        order.payerId = payerId

        await order.save()

        const studentCourses = await studentCoursesSchema.findOne({ userId: order.userId })

        if (studentCourses) {
            studentCourses.courses.push({
                courseId: order.courseId,
                title: order.courseTitle,
                instructorId: order.instructorId,
                instructorName: order.instructorName,
                dateOfPurchase: order.orderDate,
                courseImage: order.courseImage,
            })

            await studentCourses.save()
        } else {
            const newStudentCourses = new studentCoursesSchema({
                userId: order.userId,
                courses: [
                    {
                        courseId: order.courseId,
                        title: order.courseTitle,
                        instructorId: order.instructorId,
                        instructorName: order.instructorName,
                        dateOfPurchase: order.orderDate,
                        courseImage: order.courseImage,
                    }
                ]
            })

            await newStudentCourses.save()
        }

        await courseSchema.findByIdAndUpdate(order.courseId, {
            $addToSet: {
                students: {
                    studentId: order.userId,
                    studentName: order.userName,
                    studentEmail: order.userEmail,
                    paidAmount: order.coursePricing
                }
            }
        })

        res.status(200).json({
            success: true,
            message: "Order Confirmed",
            data: order
        })

    } catch (error) {
        console.log("Error While Capturing Payment Or Finalizing Order!, ", error)
        res.status(500).json({
            success: false,
            message: "Error While Capturing Payment Or Finalizing Order!",
            error: error
        })
    }
}