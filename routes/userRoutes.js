const express = require('express');

const router = express.Router();

const { protect, authorize } = require('../middlewares/authMiddleware');
const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/user');

router.route('/')
    .get(protect, authorize('admin'), getUsers)
    .post(protect, authorize('admin'), createUser);

router.route('/:id')
    .get(protect, authorize('admin'), getUser)
    .put(protect, authorize('admin'), updateUser)
    .delete(protect, authorize('admin'), deleteUser);

module.exports = router;