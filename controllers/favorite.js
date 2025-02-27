const path = require("path");
const asynchandler = require("express-async-handler");
const Favorite = require("../models/Favorite");
const ErrorResponse = require('../utils/ErrorResponse');

const setFavorite = asynchandler(async (req, res, next) => {
    const { bookId } = req.body;
    
    const existingFavorite = await Favorite.findOne({ book: bookId, user: req.user.id });
    if (existingFavorite) {
        return next(new ErrorResponse("This book is already in your favorites.", 400));
    }

    const favorite = await Favorite.create({ user: req.user.id, book: bookId });
    res.status(201).json({ message: "Book successfully added to favorites.", favorite });
});

const deleteFavorite = asynchandler(async (req, res, next) => {
    const { bookId } = req.body;
    
    const deletedFavorite = await Favorite.findOneAndDelete({ book: bookId, user: req.user.id });
    if (!deletedFavorite) {
        return next(new ErrorResponse("The requested favorite book was not found.", 404));
    }

    res.status(200).json({ message: "Book successfully removed from favorites." });
});

const getFavorite = asynchandler(async (req, res, next) => {
    const books = await Favorite.find({ user: req.user.id }).populate("book");
    
    res.status(200).json({
        count: books.length,
        success: true,
        favorites: books.length > 0 ? books : [],
        message: books.length > 0 ? "Favorite books retrieved successfully." : "No favorite books found in your collection.",
    });
});

module.exports = {
    setFavorite,
    deleteFavorite,
    getFavorite
};
