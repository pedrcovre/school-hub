const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

router.post('/', async (req, res) => {
  const {
    student_id,
    type,
    title,
    urgency,
    reason,
    file_path = null
  } = req.body;

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('student_id', sql.Int, student_id)
      .input('type', sql.VarChar(50), type)
      .input('title', sql.VarChar(100), title)
      .input('urgency', sql.VarChar(20), urgency)
      .input('reason', sql.Text, reason)
      .input('file_path', sql.VarChar(255), file_path)
      .output('new_request_id', sql.Int)
      .execute('sp_create_request');

    res.status(201).json({
      message: 'Requisição criada com sucesso!',
      request_id: result.output.new_request_id
    });
  } catch (err) {
    console.error('Erro ao criar requisição:', err);
    res.status(500).json({ error: 'Erro ao criar a requisição' });
  }
});

module.exports = router;
