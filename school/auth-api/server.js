// auth-api/server.js

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path') // 1. Importe o módulo 'path' do Node
const app = express()

const authRoutes = require('./routes/authRoutes')
const requestRoutes = require('./routes/requestRoutes')
const changePasswordRoutes = require('./routes/ChangePasswordRoutes')

app.use(
  cors({
    origin: process.env.FRONTEND_URL
  })
)
app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use('/api/auth', authRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/change-password', changePasswordRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
