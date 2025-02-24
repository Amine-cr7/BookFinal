const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bookSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  volumeInfo: {
    title: { type: String,unique: true, required: [true,'Please Add field title'] },
    publishedDate: { type: String },
    pageCount: { type: Number, required: [true,'Please Add field page count']},
    imageLinks: {
      smallphoto: { type: String},
      photo: { type: String, required: [true,'Please Add field image'] },
    },
    language: { type: String, required: [true,'Please Add field language'] },
    description: { type: String },
    publisher: { type: String },
    authors: [{ type: String}],
    categories: [{ type: String }]
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
