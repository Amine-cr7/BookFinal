const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse"); 

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({ count: users.length, message: "Users retrieved successfully", users });
});

const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorResponse("The requested user could not be found.", 404));
    }
    res.status(200).json({ message: "User retrieved successfully", user });
});

const createUser = asyncHandler(async (req, res, next) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return next(new ErrorResponse("Invalid input: username, email, and password are required.", 400));
    }

    const user = await User.create({ username, email, password, role });
    res.status(201).json({ message: "User created successfully", user });
});

const updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    );

    if (!user) {
        return next(new ErrorResponse("The requested user could not be found for update.", 404));
    }

    res.status(200).json({ message: "User updated successfully", user });
});

const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) {
        return next(new ErrorResponse("The requested user could not be found for deletion.", 404));
    }

    res.status(200).json({ message: "User deleted successfully", user });
});

module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
};
