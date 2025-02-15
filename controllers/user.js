const asynchandler = require("express-async-handler")
const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const registerUser = asynchandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400).json({ "message": "Fields Required" })
        throw new Error("Fields Required")
    }
    const checkUser = await User.findOne({ email })
    if (checkUser) {
        res.status(400)
        throw new Error("Already Used")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)
    const user = await User.create({ username, email, password: hashedPass })
    res.status(201).json({
        _id:user._id,
        username:user.username,
        email:user.email,
        jwtToken:generateToken(user._id)
    })
})
const loginUser = asynchandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ "message": "Fields Required" })
        throw new Error("Fields Required")
    }
    const user = await User.findOne({ email, password })
    const pass = await bcrypt.compare(password, user.password)
    if (!user && !pass) {
        res.status(404)
        throw new Error("User not found")
    }
    res.status(200).json({
        _id:user._id,
        username:user.username,
        email:user.email,
        jwtToken:generateToken(user._id)
    })
})

const generateToken = (id) => {
    return jwt.sign({id} ,process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}
module.exports = {
    registerUser,
    loginUser
}