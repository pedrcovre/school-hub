// auth-api/config/multer.js

const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Define o local de armazenamento dos arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads')

    // Cria a pasta 'uploads' se ela não existir
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }

    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    // Garante um nome de arquivo único para evitar sobreposição
    // Ex: anexo-1718515570189.pdf
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    )
  }
})

// Cria a instância do multer com a configuração de armazenamento
const upload = multer({ storage: storage })

// Exporta a instância para que possa ser usada nas rotas
module.exports = upload
