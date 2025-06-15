const { poolPromise, sql } = require('../db')

const getAllRequests = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`
      SELECT 
        r.id, 
        r.type AS tipo, 
        FORMAT(r.created_at, 'yyyy-MM-dd') AS data,
        r.status,
        ISNULL(u.name, 'Não definido') AS responsavel
      FROM requests r
      LEFT JOIN users u ON r.approved_by = u.id
      ORDER BY r.created_at DESC
    `)
    res.json(result.recordset)
  } catch (error) {
    console.error('Erro ao buscar requisições:', error)
    res.status(500).json({ error: 'Erro ao buscar requisições' })
  }
}

const createRequest = async (req, res) => {
  const { student_id, type, title, urgency, reason } = req.body

  const file_path = req.file ? req.file.path : null

  try {
    const pool = await poolPromise
    const result = await pool
      .request()
      .input('student_id', sql.Int, student_id)
      .input('type', sql.VarChar(50), type)
      .input('title', sql.VarChar(100), title)
      .input('urgency', sql.VarChar(20), urgency)
      .input('reason', sql.Text, reason)
      .input('file_path', sql.VarChar(255), file_path)
      .output('new_request_id', sql.Int)
      .execute('sp_create_request')

    res.status(201).json({
      message: 'Requisição criada com sucesso!',
      request_id: result.output.new_request_id
    })
  } catch (err) {
    console.error('Erro ao criar requisição:', err)
    res.status(500).json({ error: 'Erro ao criar a requisição' })
  }
}

module.exports = {
  getAllRequests,
  createRequest
}
