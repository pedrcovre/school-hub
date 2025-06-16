const { poolPromise, sql } = require('../db')
const bcrypt = require('bcryptjs')

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { currentPassword, newPassword } = req.body
    const profileImageFile = req.file

    const pool = await poolPromise

    const userResult = await pool
      .request()
      .input('userId', sql.Int, userId)
      .query('SELECT * FROM users WHERE id = @userId')

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }
    const user = userResult.recordset[0]

    const request = pool.request()
    const updates = []

    if (newPassword && currentPassword) {
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.Password
      )

      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ message: 'A senha atual está incorreta.' })
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10)
      updates.push('Password = @newPassword')
      request.input('newPassword', sql.NVarChar, hashedNewPassword)
    }

    if (profileImageFile) {
      const avatarUrl = `/uploads/${profileImageFile.filename}`
      updates.push('avatar_path = @avatarUrl')
      request.input('avatarUrl', sql.NVarChar, avatarUrl)
    }

    if (updates.length === 0) {
      return res
        .status(400)
        .json({ message: 'Nenhum dado para atualizar foi fornecido.' })
    }

    const updateQuery = `UPDATE users SET ${updates.join(
      ', '
    )} WHERE id = @userId; SELECT * FROM users WHERE id = @userId;`

    request.input('userId', sql.Int, userId)

    const updatedUserResult = await request.query(updateQuery)
    const updatedUser = updatedUserResult.recordset[0]

    const userForFrontend = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatarUrl: updatedUser.avatar_path
    }

    res.status(200).json({
      message: 'Perfil atualizado com sucesso!',
      user: userForFrontend
    })
  } catch (error) {
    console.error('Erro detalhado ao atualizar perfil:', error)
    res
      .status(500)
      .json({ message: 'Erro interno do servidor ao atualizar o perfil.' })
  }
}

module.exports = {
  updateUserProfile
}
