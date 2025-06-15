const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'seu-secret-super-seguro-e-longo'

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Acesso negado. Token não fornecido.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({ error: 'Token inválido ou expirado.' })
  }
}

module.exports = authMiddleware
