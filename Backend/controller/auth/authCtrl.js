const userSchema = require("../../model/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports.registerUser = async (req, res) => {
    try {
        const {userName, userEmail, password, role} = req.body
    
        const existUser = await userSchema.findOne({$or: [{userEmail}, {userName}]})
    
        if(existUser) {
            return res.status(400).json({
                success: false,
                message: 'User Name Or User Email Already Exists!'
            })
        }
    
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userSchema({userName, userEmail, role, password: hashPassword})
    
        await newUser.save()
    
        return res.status(200).json({
            success: true,
            message: 'User Registered Successfully',
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error Occured While Registering User',
            error: error
        })
        console.log("Error Occured While Registering User, ", error)
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const {userEmail, password} = req.body

        const checkUser = await userSchema.findOne({userEmail})
        const hashPassword = await bcrypt.compare(password, checkUser.password)

        if(!checkUser || !hashPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Email Or Password'
            })
        }

        const accessToken = jwt.sign({
            _id: checkUser._id,
            userName: checkUser.userName,
            userEmail: checkUser.userEmail,
            role: checkUser.role
        }, "JWT_SECRET", {expiresIn: '2h'})

        return res.status(200).json({
            success: true,
            message: 'User Login Successfully',
            data: {
                accessToken: accessToken,
                user: {
                    _id: checkUser._id,
                    userName: checkUser.userName,
                    userEmail: checkUser.userEmail,
                    role: checkUser.role
                }
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error Occured While Login User',
            error: error
        })
    }
}