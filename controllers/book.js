const path = require("path")
const asynchandler = require('express-async-handler')
const Book = require('../models/Book')

const getBooks = asynchandler(async (req,res) => {
    let query;
    let reqQuery = {...req.query}
    
    const removeFields = ['select','sort']
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
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').map(field => `volumeInfo.${field}`).join(' ');
        query = query.sort(sortBy)
    }
    const books = await query
    res.status(200).json({message:"success",count:books.length,books})
})

const setBook = asynchandler(async (req,res) => {
    req.body.user = req.user.id
    const publishedBook = await Book.findOne({user:req.user.id})
    if (publishedBook && req.user.role !== "admin"){
        res.status(400)
        throw new Error(`The User Id ${req.user.id}  Has Already published a Book`) 
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
    if(book.user != req.user.id){
        res.status(400)
        throw new Error(`This not your book `)
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
    if(book.user != req.user.id){
        res.status(400)
        throw new Error(`This not your book `)
    }
    const deletedBook = await Book.deleteOne({_id:req.params.id})
    res.status(200).json({message:'success'})
})

const uploadPhotoBook = asynchandler(async(req,res) => {
    const book = await Book.findById(req.params.id)
    
    if(!book){
        res.status(404)
        throw new Error("Book not found") 
    }
    if(book.user != req.user.id){
        res.status(400)
        throw new Error(`This not your book `)
    }
    if(!req.files){
        res.status(404)
        throw new Error("file not upload") 
    }
    const file = req.files.file
    if(!file.mimetype.startsWith('image')){
        res.status(404)
        throw new Error("this is not a file image") 
    }
    if(!file.size > process.env.MAX_FILE_UPLOAD){
        res.status(404)
        throw new Error(`the size of file is big than ${process.env.MAX_FILE_UPLOAD} `) 
    }
    file.name = `photo${book.id}${path.parse(file.name).ext}`
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}` , async error => {
        if(error){
            res.status(500)
            throw new Error(` file is not upload her `) 
        }
        await Book.findByIdAndUpdate(req.params.id , { "volumeInfo.imageLinks.photo" : file.name,"volumeInfo.imageLinks.smallphoto" : file.name})
        res.status(200).json({message:'success' , data : file.name})
    })
})
module.exports = {
    getBooks,
    setBook,
    getBook,
    putBook,
    deleteBook,
    uploadPhotoBook
}