const express = require('express')
const router = express.Router()
const multer = require('multer')

const authMiddleware = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')

const upload = multer({ dest: 'uploads/' })

router.patch(
  '/profile',
  authMiddleware,
  upload.single('profileImage'),
  userController.updateUserProfile
)

module.exports = router
