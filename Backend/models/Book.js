const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bookSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  volumeInfo: {
    title: { type: String,unique: true },
    publishedDate: { type: String },
    pageCount: { type: Number},
    imageLinks: {
      smallphoto: { type: String},
      photo: { type: String,  },
    },
    language: { type: String,  },
    description: { type: String },
    publisher: { type: String },
    authors: [{ type: String}],
    categories: [{ type: String }]
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
