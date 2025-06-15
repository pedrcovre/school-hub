// auth-api/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // 1. Importe o módulo 'path' do Node
const app = express();

const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

// 2. Adicione esta linha para servir arquivos estáticos
// Diz ao Express: "Se uma requisição começar com /uploads, sirva o arquivo correspondente da pasta 'uploads' no disco"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// SUAS ROTAS DE API
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});