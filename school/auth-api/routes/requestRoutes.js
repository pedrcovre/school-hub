const express = require('express')
const router = express.Router()
const requestController = require('../controllers/requestController')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

router.get('/', requestController.getAllRequests)

router.post('/', upload.single('file'), requestController.createRequest)

module.exports = router
