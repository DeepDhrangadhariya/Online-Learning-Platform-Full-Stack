require("dotenv").config()
const express = require("express");
const cors = require("cors")
const port = process.env.PORT
const app = express()

const MONGO_URL = process.env.MONGO_URL
const CLIENT_URL = process.env.CLIENT_URL
const db = require("./config/database")

app.use(cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

app.use('/auth', require("./routes/auth/authRoutes"))
app.use('/media', require('./routes/instructor/media'))
app.use('/instructor/course', require('./routes/instructor/course'))
app.use('/student/course', require('./routes/student/course'))
app.use('/student/order', require('./routes/student/order'))
app.use('/student/courses-bought', require('./routes/student/studentCourses'))
app.use('/student/course-progress', require('./routes/student/courseProgress'))

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).json({
        success: false,
        message: "Something Went Wrong",
    })
})

app.listen(port, () => {
    try {
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        console.log("Server Connection Error, ", error)
    }
})