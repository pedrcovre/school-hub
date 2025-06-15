const express = require('express')
const router = express.Router()
const requestController = require('../controllers/requestController')
const multer = require('multer')
const authMiddleware = require('../middleware/authMiddleware')

const upload = multer({ dest: 'uploads/' })

router.get('/', authMiddleware, requestController.getAllRequests)

router.post(
  '/',
  authMiddleware,
  upload.single('file'),
  requestController.createRequest
)

module.exports = router
