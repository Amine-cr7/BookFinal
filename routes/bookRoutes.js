const express = require('express')

const router = express.Router()

const {getBooks,setBook,getBook,putBook,deleteBook} = require('../controllers/book')
const {protect} = require("../middlewares/authMiddleware")
router.route('/').get(getBooks).post(setBook)
router.route('/:id').get(getBook).put(putBook).delete(deleteBook)

module.exports = router