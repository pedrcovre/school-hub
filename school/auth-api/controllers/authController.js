const { poolPromise, sql } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'seu-secret-super-seguro-e-longo'

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Nome, email e senha são obrigatórios.' })
    }

    const pool = await poolPromise

    const userExistsResult = await pool
      .request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM Users WHERE email = @email')

    if (userExistsResult.recordset.length > 0) {
      return res.status(400).json({ message: 'Este email já está em uso.' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await pool
      .request()
      .input('name', sql.VarChar, name)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, hashedPassword)
      .input('role', sql.VarChar, role || 'student')
      .query(
        'INSERT INTO Users (Name, email, password, role) VALUES (@name, @email, @password, @role)'
      )

    res.status(201).json({ message: 'Usuário registrado com sucesso!' })
  } catch (error) {
    console.error('Erro no registro:', error)
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email e senha são obrigatórios.' })
    }

    const pool = await poolPromise

    const result = await pool
      .request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM Users WHERE email = @email')

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' })
    }

    const user = result.recordset[0]
    const isMatch = await bcrypt.compare(password, user.Password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' })
    }

    const payload = { id: user.Id, name: user.Name, role: user.Role }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })

    res.json({
      token,
      user: { id: user.Id, name: user.Name, email: user.Email, role: user.Role }
    })
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' })
  }
}
