// auth-api/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer'); // 1. Importamos o multer

const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// 2. Configuramos o multer para salvar os arquivos na pasta 'uploads'
const upload = multer({ dest: 'uploads/' });

// 3. Adicionamos o middleware do multer na rota PATCH
router.patch(
  '/profile',
  authMiddleware,
  upload.single('profileImage'), // <-- PONTO CHAVE: multer processa o arquivo ANTES do controller
  userController.updateUserProfile
);

module.exports = router;