const express = require('express')

const router = express.Router()

const {getBooks,setBook,getBook,putBook,deleteBook, uploadPhotoBook} = require('../controllers/book')
const {protect,authorize} = require("../middlewares/authMiddleware")
router.route('/').get(getBooks).post(protect,authorize('admin','publisher'),setBook)
router.route('/:id').get(protect,authorize('admin','publisher'),getBook).put(protect,authorize('admin','publisher'),putBook).delete(protect,authorize('admin','publisher'),deleteBook)
router.route('/:id/photo').put(protect,authorize('admin','publisher'),uploadPhotoBook)
module.exports = router