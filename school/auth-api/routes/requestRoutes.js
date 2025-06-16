// routes/requestRoutes.js
const express = require('express')
const router = express.Router()
const requestController = require('../controllers/requestController')
const multer = require('multer')
const authMiddleware = require('../middleware/authMiddleware')

const upload = multer({ dest: 'uploads/' })

router.get('/', authMiddleware, requestController.getAllRequests)
router.get('/:id', authMiddleware, requestController.getRequestById);

router.post(
  '/',
  authMiddleware,
  upload.single('file'),
  requestController.createRequest
)
router.put(
  '/:id',
  authMiddleware,
  upload.single('file'),
  requestController.updateRequest // Você vai criar essa função
)

router.delete('/:id', authMiddleware, requestController.deleteRequest)

module.exports = router
