require('dotenv').config();
const jwt = require('jsonwebtoken')
class Middleware {
    static checkAuth (req, res, next) {
        if (!req.headers || !req.headers.authorization) {
            res.status(401).json({ message: 'Unauthorized'})
        }
    
        const token = req.headers.authorization
        const verifyToken = jwt.verify(token, process.env.SECRET)
    
        if (verifyToken) {
            next()
        }
        res.status(401).json({ message: 'Unauthorized'})
    }
}

module.exports = Middleware