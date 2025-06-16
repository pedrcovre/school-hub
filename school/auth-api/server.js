
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const authRoutes = require('./routes/authRoutes')
const requestRoutes = require('./routes/requestRoutes')
const changePasswordRoutes = require('./routes/ChangePasswordRoutes')
const userRoutes = require('./routes/userRoutes')

// Middleware CORS com origem do frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// Middleware para parsear JSON
app.use(express.json());

// Logger simples
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/change-password', changePasswordRoutes)
app.use('/api/users', userRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Inicializa servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});