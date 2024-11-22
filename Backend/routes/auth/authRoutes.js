const express = require('express');
const routes = express.Router()
const authCtrl = require("../../controller/auth/authCtrl")
const auth = require("../../middleware/auth")

routes.post('/register', authCtrl.registerUser)
routes.post('/login', authCtrl.loginUser)
routes.get('/check-auth', auth, (req, res) => {
    const user = req.user

    res.status(200).json({
        success: true,
        message: 'Authenticated User!',
        data: {
            user
        }
    })
})
 
module.exports = routes