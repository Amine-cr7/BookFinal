const asynchandler = require('express-async-handler')
const Book = require('../models/Book')

const getBooks = asynchandler(async (req,res) => {
    let query;
    let reqQuery = {...req.query}
    
    const removeFields = ['select']
    removeFields.forEach(field => delete reqQuery[field])

    Object.keys(reqQuery).forEach(key => {
        reqQuery[`volumeInfo.${key}`] = reqQuery[key];
        delete reqQuery[key];
    });

    let queryStr = JSON.stringify(reqQuery)
    
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`)
    query = Book.find(JSON.parse(queryStr))

    if (req.query.select) {
        const fields = req.query.select.split(',').map(field => `volumeInfo.${field}`).join(' ');
        query = query.select(fields);
    }

    const books = await query
    res.status(200).json({message:"success",count:books.length,books})
})

const setBook = asynchandler(async (req,res) => {
    if(!req.body){
        res.status(400)
        throw new Error("Something error");
    }
    const book = await Book.create(req.body)
    res.status(201).json(book)
})
const getBook = asynchandler(async(req,res) => {
    const book = await Book.findById(req.params.id)
    if(!book){
        res.status(404)
        throw new Error("Book not found");
        
    }
    res.status(200).json(book)
})
const putBook = asynchandler(async(req,res) => {
    const book = await Book.findById(req.params.id)
    if(!book){
        res.status(404)
        throw new Error("Book not found") 
    }
    const updateBook = await Book.updateOne({_id:req.params.id},req.body)
    res.status(200).json(updateBook)
})
const deleteBook = asynchandler(async(req,res) => {
    const book = await Book.findById(req.params.id)
    if(!book){
        res.status(404)
        throw new Error("Book not found") 
    }
    const deletedBook = await Book.deleteOne({_id:req.params.id})
    res.status(200).json({message:'success'})
})
module.exports = {
    getBooks,
    setBook,
    getBook,
    putBook,
    deleteBook
}