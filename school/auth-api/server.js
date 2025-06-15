require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});

