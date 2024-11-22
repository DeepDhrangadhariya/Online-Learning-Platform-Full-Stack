const jwt = require("jsonwebtoken")

const verifyToekn = (token, secretKey) => {
    return jwt.verify(token, secretKey)
}

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'User Is Not Authenticated'
        })
    }

    const token = authHeader.split(' ')[1]

    const payload = verifyToekn(token, "JWT_SECRET")

    req.user = payload

    next()
}

module.exports = authenticate