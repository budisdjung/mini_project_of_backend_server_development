require('dotenv').config();
const jwt = require('jsonwebtoken')

class Middleware {
    static checkAuth (req, res, next) {
        if (!req.headers || !req.headers.authorization) {
            res.status(401).json({ message: 'Unauthorized'})
        }
    
        const token = req.headers.authorization

        let verifyToken = null
        if(token) {
            verifyToken = jwt.verify(token, 'shhhhh')
            if (verifyToken) {
                next()
            }
        }
    }
}

module.exports = Middleware