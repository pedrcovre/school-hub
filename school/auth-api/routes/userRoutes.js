const express = require('express')
const router = express.Router()
const multer = require('multer')

const userController = require('../controllers/userController')

const authMiddleware = require('../middleware/authMiddleware');
const upload = multer({ dest: 'uploads/' })

router.patch(
  '/profile',
  authMiddleware,

  upload.single('profileImage'),
  userController.updateUserProfile
)

module.exports = router
