const express = require('express')

const router = express.Router()

const {registerUser, loginUser} = require('../controllers/user')

router.post('/',registerUser)
router.get('/',loginUser)

module.exports = router