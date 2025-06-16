const express = require('express')
const router = express.Router()
const { poolPromise } = require('../db')

router.put('/', async (req, res) => {
  const { email, novaSenha } = req.body

  console.log('🔁 Dados recebidos no backend:', req.body)

  if (!email || !novaSenha) {
    return res
      .status(400)
      .json({ mensagem: 'Email e nova senha são obrigatórios.' })
  }

  try {
    const pool = await poolPromise
    await pool
      .request()
      .input('email', email)
      .input('password', novaSenha)
      .query('UPDATE Users SET Password = @password WHERE Email = @email')

    res.json({ mensagem: 'Senha alterada com sucesso!' })
  } catch (error) {
    console.error('Erro ao atualizar senha:', error)
    res.status(500).json({ mensagem: 'Erro ao alterar senha.' })
  }
})

module.exports = router
