const { poolPromise, sql } = require('../db')

const getAllRequests = async (req, res) => {
  const { id: userId, role } = req.user

  try {
    const pool = await poolPromise
    let query
    const request = pool.request()

    if (role === 'admin') {
      query = `
        SELECT 
          r.id, 
          r.type AS tipo, 
          FORMAT(r.created_at, 'yyyy-MM-dd') AS data,
          r.status,
          r.title,
          ISNULL(student.Name, 'Aluno não encontrado') AS responsavel
        FROM requests r
        LEFT JOIN Users student ON r.student_id = student.Id
        ORDER BY r.created_at DESC;
      `
    } else {
      query = `
        SELECT 
          r.id, 
          r.type AS tipo, 
          FORMAT(r.created_at, 'yyyy-MM-dd') AS data,
          r.status,
          r.title,
          ISNULL(admin.Name, 'Pendente') AS responsavel
        FROM requests r
        LEFT JOIN Users admin ON r.decided_by = admin.Id
        WHERE r.student_id = @userId
        ORDER BY r.created_at DESC;
      `
      request.input('userId', sql.Int, userId)
    }

    const result = await request.query(query)
    res.json(result.recordset)
  } catch (error) {
    console.error('ERRO DETALHADO AO BUSCAR REQUISIÇÕES:', error)
    res
      .status(500)
      .json({ error: 'Erro interno no servidor ao buscar requisições.' })
  }
}

const getRequestById = async (req, res) => {
  const requestId = req.params.id
  try {
    const pool = await poolPromise
    const result = await pool.request().input('id', sql.Int, requestId).query(`
        SELECT 
          r.id, 
          r.type AS tipo, 
          r.title,
          r.urgency,
          FORMAT(r.created_at, 'yyyy-MM-dd') AS data,
          r.status,
          r.reason,
          ISNULL(u.Name, 'Não definido') AS responsavel,
          r.file_path AS arquivo
        FROM requests r
        LEFT JOIN Users u ON r.student_id = u.Id
        WHERE r.id = @id
      `)

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Requisição não encontrada' })
    }

    res.json(result.recordset[0])
  } catch (error) {
    console.error('ERRO DETALHADO AO BUSCAR REQUISIÇÃO POR ID:', error)
    res
      .status(500)
      .json({ error: 'Erro interno no servidor ao buscar requisição.' })
  }
}

const createRequest = async (req, res) => {
  const { student_id, type, title, urgency, reason } = req.body
  const filePath = req.file ? req.file.path : null

  try {
    const pool = await poolPromise
    const result = await pool
      .request()
      .input('student_id', sql.Int, student_id)
      .input('type', sql.VarChar(50), type)
      .input('title', sql.VarChar(100), title)
      .input('urgency', sql.VarChar(20), urgency)
      .input('reason', sql.Text, reason)
      .input('file_path', sql.VarChar(255), filePath)
      .query(
        `INSERT INTO requests (student_id, type, title, urgency, reason, file_path) 
         VALUES (@student_id, @type, @title, @urgency, @reason, @file_path);
         SELECT SCOPE_IDENTITY() AS new_request_id;`
      )

    res.status(201).json({
      message: 'Requisição criada com sucesso!',
      request_id: result.recordset[0].new_request_id
    })
  } catch (err) {
    console.error('ERRO DETALHADO AO CRIAR REQUISIÇÃO:', err)
    res.status(500).json({ error: 'Erro ao criar a requisição' })
  }
}

const updateRequest = async (req, res) => {
  const requestId = req.params.id
  const { title, type, urgency, reason } = req.body
  const filePath = req.file ? req.file.path : null

  try {
    const pool = await poolPromise
    let query = `
      UPDATE requests
      SET title = @title,
          type = @type,
          urgency = @urgency,
          reason = @reason
          ${filePath ? ', file_path = @file_path' : ''}
      WHERE id = @id;
    `

    const request = pool
      .request()
      .input('id', sql.Int, requestId)
      .input('title', sql.VarChar(100), title)
      .input('type', sql.VarChar(50), type)
      .input('urgency', sql.VarChar(20), urgency)
      .input('reason', sql.Text, reason)

    if (filePath) {
      request.input('file_path', sql.VarChar(255), filePath)
    }

    await request.query(query)

    res.status(200).json({ message: 'Requisição atualizada com sucesso!' })
  } catch (err) {
    console.error('ERRO DETALHADO AO ATUALIZAR REQUISIÇÃO:', err)
    res.status(500).json({ error: 'Erro ao atualizar a requisição' })
  }
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
    console.error('ERRO DETALHADO AO EXCLUIR REQUISIÇÃO:', err)
    res.status(500).json({ error: 'Erro ao excluir a requisição' })
  }
}

const updateRequestStatus = async (req, res) => {
  const requestId = req.params.id
  const { status } = req.body
  const adminId = req.user.id

  if (!status || !['approved', 'rejected'].includes(status)) {
    return res
      .status(400)
      .json({ error: 'Status inválido. Use "approved" ou "rejected".' })
  }

  try {
    const pool = await poolPromise
    const result = await pool
      .request()
      .input('id', sql.Int, requestId)
      .input('status', sql.VarChar(20), status)
      .input('adminId', sql.Int, adminId).query(`
        UPDATE requests 
        SET 
          status = @status, 
          decided_by = @adminId,
          decided_at = GETDATE()
        WHERE id = @id;
      `)

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Requisição não encontrada.' })
    }

    res
      .status(200)
      .json({ message: 'Status da requisição atualizado com sucesso!' })
  } catch (error) {
    console.error('ERRO DETALHADO AO ATUALIZAR STATUS:', error)
    res
      .status(500)
      .json({ error: 'Erro interno ao atualizar o status da requisição' })
  }
}

module.exports = {
  getAllRequests,
  createRequest,
  deleteRequest,
  getRequestById,
  updateRequest,
  updateRequestStatus
}
