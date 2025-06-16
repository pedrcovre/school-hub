const express = require('express')
const router = express.Router()
const {
  getAllRequests,
  createRequest,
  deleteRequest,
  getRequestById,
  updateRequest,
  updateRequestStatus,
  addOrUpdateObservation
} = require('../controllers/requestController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const upload = require('../config/multer')

router.get('/', authMiddleware, getAllRequests)
router.get('/:id', authMiddleware, getRequestById)
router.post('/', authMiddleware, upload.single('file'), createRequest)
router.put('/:id', authMiddleware, upload.single('file'), updateRequest)
router.delete('/:id', authMiddleware, deleteRequest)
router.patch(
  '/:id/status',
  authMiddleware,
  adminMiddleware,
  updateRequestStatus
)
router.patch(
  '/:id/observation',
  authMiddleware,
  adminMiddleware,
  addOrUpdateObservation
)

module.exports = router
