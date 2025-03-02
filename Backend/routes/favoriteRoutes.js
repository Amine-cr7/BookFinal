const express = require('express')
const { setFavorite, deleteFavorite, getFavorite } = require('../controllers/favorite')

const router = express.Router()
const {protect} = require("../middlewares/authMiddleware")

router.route('/').delete(protect,deleteFavorite).get(protect,getFavorite).post(protect,setFavorite)

module.exports = router
