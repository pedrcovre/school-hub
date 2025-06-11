require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/authRoutes')

app.use(cors()) 

app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000')
})
