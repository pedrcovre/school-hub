require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const authRoutes = require('./routes/authRoutes')
const requestRoutes = require('./routes/requestRoutes')
const userRoutes = require('./routes/userRoutes')
const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL }))
app.use(express.json())
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use('/api/auth', authRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/users', userRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
// Inicializa servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`)
})
