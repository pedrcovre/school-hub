const { poolPromise, sql } = require('../db')

const getAllRequests = async (req, res) => {
  const { id: userId, role } = req.user

  try {
    const pool = await poolPromise
    let query = `
      SELECT 
        r.id, 
        r.type AS tipo, 
        FORMAT(r.created_at, 'yyyy-MM-dd') AS data,
        r.status,
        ISNULL(u.name, 'Não definido') AS responsavel,
        r.file_path
      FROM requests r
      LEFT JOIN users u ON r.approved_by = u.id
    `

    const request = pool.request()

    if (role === 'admin') {
      query = `
        SELECT 
          r.id, 
          r.type AS tipo, 
          FORMAT(r.created_at, 'yyyy-MM-dd') AS data,
          r.status,
          ISNULL(student.Name, 'Aluno não encontrado') AS responsavel
        FROM requests r
        LEFT JOIN Users student ON r.student_id = student.Id
        ORDER BY r.created_at DESC
      `
    } else {
      query = `
        SELECT 
          r.id, 
          r.type AS tipo, 
          FORMAT(r.created_at, 'yyyy-MM-dd') AS data,
          r.status,
          ISNULL(admin.Name, 'Não definido') AS responsavel
        FROM requests r
        LEFT JOIN Users admin ON r.decided_by = admin.Id
        WHERE r.student_id = @userId
        ORDER BY r.created_at DESC
      `
      request.input('userId', sql.Int, userId)
    }

    const result = await request.query(query)

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

const deleteRequest = async (req, res) => {
  const requestId = req.params.id

  try {
    const pool = await poolPromise
    await pool
      .request()
      .input('id', sql.Int, requestId)
      .query('DELETE FROM requests WHERE id = @id')

    res.status(200).json({ message: 'Requisição excluída com sucesso!' })
  } catch (err) {
    console.error('Erro ao excluir requisição:', err)
    res.status(500).json({ error: 'Erro ao excluir a requisição' })
  }
}

module.exports = {
  getAllRequests,
  createRequest,
  deleteRequest
}