const { poolPromise, sql } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')

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
      .query('SELECT * FROM Users WHERE Email = @email')

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
        'INSERT INTO Users (Name, Email, Password, Role) VALUES (@name, @email, @password, @role)'
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
      .query('SELECT * FROM Users WHERE Email = @email')

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
      user: {
        id: user.Id,
        name: user.Name,
        email: user.Email,
        role: user.Role,
        avatarUrl: user.avatar_path
      }
    })
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' })
  }
}

exports.forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const pool = await poolPromise
    const userResult = await pool
      .request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE Email = @email')

    if (userResult.recordset.length === 0) {
      return res
        .status(200)
        .json({ message: 'Se o e-mail estiver correto, um link foi enviado.' })
    }

    const user = userResult.recordset[0]
    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')
    const expirationDate = new Date(Date.now() + 10 * 60 * 1000)

    await pool
      .request()
      .input('token', sql.NVarChar, hashedToken)
      .input('expires', sql.DateTime, expirationDate)
      .input('userId', sql.Int, user.Id)
      .query(
        'UPDATE Users SET PasswordResetToken = @token, PasswordResetExpires = @expires WHERE Id = @userId'
      )

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    const message = `<h1>Redefinição de Senha</h1><p>Clique <a href="${resetURL}" target="_blank">aqui</a> para redefinir sua senha. Este link é válido por 10 minutos.</p>`

    await sendEmail({
      to: user.Email,
      subject: 'Redefinição de Senha',
      html: message
    })

    res.status(200).json({ message: 'E-mail de redefinição enviado.' })
  } catch (error) {
    console.error('Erro em forgotPassword:', error)
    res.status(500).json({ message: 'Ocorreu um erro ao enviar o e-mail.' })
  }
}

exports.resetPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  try {
    if (!token || !password) {
      return res
        .status(400)
        .json({ message: 'Token e nova senha são obrigatórios.' })
    }
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const pool = await poolPromise
    const userResult = await pool
      .request()
      .input('token', sql.NVarChar, hashedToken)
      .query(
        'SELECT Id FROM Users WHERE PasswordResetToken = @token AND PasswordResetExpires > GETDATE()'
      )

    if (userResult.recordset.length === 0) {
      return res.status(400).json({ message: 'Token inválido ou expirado.' })
    }

    const user = userResult.recordset[0]
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await pool
      .request()
      .input('password', sql.NVarChar, hashedPassword)
      .input('userId', sql.Int, user.Id)
      .query(
        'UPDATE Users SET Password = @password, PasswordResetToken = NULL, PasswordResetExpires = NULL WHERE Id = @userId'
      )

    res
      .status(200)
      .json({ status: 'success', message: 'Senha alterada com sucesso.' })
  } catch (error) {
    console.error('Erro em resetPassword:', error)
    res.status(500).json({ message: 'Erro ao redefinir a senha.' })
  }
}
