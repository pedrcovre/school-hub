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

module.exports = {
  getAllRequests
}