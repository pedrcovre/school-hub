const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const {
  createResource,
  getResourcesByRequestId,
  deleteResource
} = require('../controllers/resourcesController')


router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  upload.single('resourceFile'),
  createResource
)


router.get(
  '/request/:requestId',
  authMiddleware,
  getResourcesByRequestId
)


router.delete('/:id', authMiddleware, adminMiddleware, deleteResource)

module.exports = router
