require('dotenv').config()
const secret = process.env.SECRET

const User = require('../models/User')
const jwt = require('jsonwebtoken')

const withAuth = async (req, res, next) => {

    try {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: no token provided' })
        }

        const decoded = jwt.verify(token, secret)
        req.email = decoded.email

        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: user not found' })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ error: `Unauthorized: invalid token ${error}` })
    }

}

module.exports = withAuth