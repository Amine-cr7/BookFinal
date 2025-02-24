const express = require('express')

const router = express.Router()

const {registerUser, loginUser, UpdateUserDetails} = require('../controllers/user')
const { protect } = require('../middlewares/authMiddleware')

router.route('/').post(registerUser).put(protect,UpdateUserDetails)
router.post('/login',loginUser)

module.exports = router