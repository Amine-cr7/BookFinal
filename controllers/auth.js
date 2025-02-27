const asynchandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse"); 
const crypto = require("crypto")
const nodemailer = require("nodemailer"); 
require("dotenv").config();
// Register a new user
const registerUser = asynchandler(async (req, res, next) => {
    const { username, email, password, role } = req.body;
    
    if (!username || !email || !password) {
        return next(new ErrorResponse("All fields (username, email, password) are required.", 400));
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
        return next(new ErrorResponse("This email is already associated with an account.", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPass, role });
    
    res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        jwtToken: generateToken(user._id)
    });
});

// Login a user
const loginUser = asynchandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return next(new ErrorResponse("Both email and password are required to log in.", 400));
    }

    const user = await User.findOne({ email });
    
    if (!user) {
        return next(new ErrorResponse("User not found with this email address.", 404));
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
        return next(new ErrorResponse("Incorrect password. Please try again.", 400));
    }

    res.status(200).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        jwtToken: generateToken(user._id)
    });
});

// Update user details
const UpdateUserDetails = asynchandler(async (req, res, next) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return next(new ErrorResponse("Both username and email are required to update.", 400));
    }

    const updateDetails = {
        username,
        email
    };

    const user = await User.findByIdAndUpdate(req.user.id, updateDetails, { new: true, runValidators: true });
    
    if (!user) {
        return next(new ErrorResponse("User not found or failed to update.", 404));
    }

    res.status(200).json({
        message: "User details updated successfully.",
        user
    });
});


// forget
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT ,
    auth:{
        user : process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

const ForgotPassword = asynchandler( async(req,res,next) => {
    const user = await User.findOne({ email: req.body.email }) ;
    if(!user){    
        return next(new ErrorResponse("Email Not Found.", 404));
    }

     //Get reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000 ; 
        await user.save();


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            text: `You requested a password reset. Click the link to reset your password: `,
            html: `<p>You requested a password reset. Click the link below to reset your password:</p>
                   `
        };

        await transporter.sendMail(mailOptions)
        res.status(200).json({
        success : true,
        messgae:  " Sending ",
        resetToken: resetToken
    });
})

const ResetPassword = asynchandler( async( req, res, next) => {
    const {resetToken, newPassword} = req.body;

    if (!resetToken || !newPassword) {
        return res.status(400).json({ message: "Token and new password are required" });
    }

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword , salt)
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });

})

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    registerUser,
    loginUser,
    UpdateUserDetails,
    ForgotPassword,
    ResetPassword
};
