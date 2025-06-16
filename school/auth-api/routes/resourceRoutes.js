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

// Cria recurso com upload de arquivo opcional
router.post(
  '/',
  authMiddleware,
  adminMiddleware, // só admin pode adicionar recurso
  upload.single('resourceFile'),
  createResource
)

// Listar recursos de uma requisição específica
router.get(
  '/request/:requestId',
  authMiddleware,
  getResourcesByRequestId
)

// Excluir recurso (opcional)
router.delete('/:id', authMiddleware, adminMiddleware, deleteResource)

module.exports = router
