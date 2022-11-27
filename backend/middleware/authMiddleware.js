const jwt = require('jsonwebtoken')

const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Getting the token from the header note the format Bearer token
            token = req.headers.authorization.split(' ')[1]
            
            //Verifying the user and access their details
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            // Get the user from the token
            req.user = await User.findById(decoded.id).select('-password')
            
            //Call the next middleware
            next()
        } catch (error) {
            console.log(error);
            req.status(401);
            throw new Error('Not Authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }