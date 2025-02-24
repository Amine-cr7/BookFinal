const path = require("path")
const asynchandler = require('express-async-handler')
const Favorite = require("../models/Favorite")
const setFavorite = asynchandler (async (req,res) => {
    const {bookId} = req.body
    const existingFavorite = await Favorite.findOne({book:bookId,user:req.user.id})
    if(existingFavorite){
        res.status(400)
        throw new Error("Book is already in favorites")
    }
    const favorite = await Favorite.create({user:req.user.id , book: bookId})
    res.status(201).json({message:"Book added to favorites",favorite});
}) 

const deleteFavorite = asynchandler (async (req,res) => {
    const {bookId} = req.body
    const deletedFavorite = await Favorite.findOneAndDelete({book:bookId,user:req.user.id})
    if(!deletedFavorite){
        res.status(404)
        throw new Error("Favorite Not Found")
    }
    res.status(200).json({message:"Book removed from favorites"});
}) 

const getFavorite = asynchandler(async (req, res) => {
    const books = await Favorite.find({ user: req.user.id }).populate("book");
    res.status(200).json({
        count:books.length,
        success: true,
        favorites: books.length > 0 ? books : [],
        message: books.length > 0 ? "Favorites retrieved successfully" : "No favorite books found",
    });
});
module.exports = {
    setFavorite,
    deleteFavorite,
    getFavorite
}