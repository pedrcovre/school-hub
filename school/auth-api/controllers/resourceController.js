const path = require('path')
const { poolPromise, sql } = require('../db') // Ajuste conforme seu db

const createResource = async (req, res) => {
  try {
    const userId = req.user.id
    const {
      requestId,
      resourceType,
      resourceName,
      resourceQuantity,
      resourceLink
    } = req.body

    if (!requestId || !resourceType || !resourceName) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' })
    }

    // Se arquivo foi enviado, salva caminho
    let filePath = null
    if (req.file) {
      // Salva caminho relativo para uso futuro
      filePath = path.join('/uploads', req.file.filename)
    }

    const pool = await poolPromise
    const result = await pool
      .request()
      .input('request_id', sql.Int, requestId)
      .input('type', sql.VarChar(50), resourceType)
      .input('name', sql.VarChar(100), resourceName)
      .input('quantity', sql.Int, resourceQuantity || null)
      .input('link', sql.VarChar(255), resourceLink || filePath || null)
      .input('file_path', sql.VarChar(255), filePath)
      .input('added_by', sql.Int, userId)
      .query(
        `INSERT INTO resources
        (request_id, type, name, quantity, link, file_path, added_by)
        VALUES
        (@request_id, @type, @name, @quantity, @link, @file_path, @added_by)`
      )

    res.status(201).json({ message: 'Recurso criado com sucesso' })
  } catch (error) {
    console.error('Erro ao criar recurso:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
}

const getResourcesByRequestId = async (req, res) => {
  try {
    const requestId = parseInt(req.params.requestId)
    if (isNaN(requestId)) {
      return res.status(400).json({ error: 'ID da requisição inválido' })
    }

    const pool = await poolPromise
    const result = await pool
      .request()
      .input('request_id', sql.Int, requestId)
      .query('SELECT * FROM resources WHERE request_id = @request_id')

    res.json(result.recordset)
  } catch (error) {
    console.error('Erro ao buscar recursos:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
}

const deleteResource = async (req, res) => {
  try {
    const resourceId = parseInt(req.params.id)
    if (isNaN(resourceId)) {
      return res.status(400).json({ error: 'ID do recurso inválido' })
    }

    const pool = await poolPromise
    await pool
      .request()
      .input('id', sql.Int, resourceId)
      .query('DELETE FROM resources WHERE id = @id')

    res.json({ message: 'Recurso deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar recurso:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
}

module.exports = {
  createResource,
  getResourcesByRequestId,
  deleteResource
}
