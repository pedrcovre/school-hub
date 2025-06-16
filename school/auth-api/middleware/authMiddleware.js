const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'seu-secret-super-seguro-e-longo'

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Acesso negado. Nenhum token fornecido.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' })
  }
}

module.exports = authMiddleware
