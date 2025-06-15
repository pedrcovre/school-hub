// src/contexts/AuthContext.js

import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password
        }
      )
      const { token, user: userData } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setToken(token)
      setUser(userData)
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro no servidor')
    }
  }

  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name,
          email,
          password
        }
      )
      return response.data
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Erro no servidor ao registrar'
      )
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  // ==================================================================
  // NOVO CÓDIGO COMEÇA AQUI: Função para atualizar o perfil
  // ==================================================================
  const updateUserProfile = async updates => {
    // Usaremos FormData para enviar arquivos (imagem) e texto (senha) juntos
    const formData = new FormData()

    if (updates.profileImage) {
      // O nome 'profileImage' deve ser o mesmo que sua API espera receber
      formData.append('profileImage', updates.profileImage)
    }
    if (updates.newPassword) {
      formData.append('currentPassword', updates.currentPassword)
      formData.append('newPassword', updates.newPassword)
    }

    try {
      // Fazemos a chamada para a API. A URL do endpoint pode variar.
      // Geralmente é algo como /api/users/profile ou /api/users/me
      const response = await axios.patch(
        'http://localhost:5000/api/users/profile',
        formData,
        {
          headers: {
            // Passamos o token de autorização para a API saber quem somos
            Authorization: `Bearer ${token}`,
            // Com FormData, o axios define o 'Content-Type' como 'multipart/form-data' automaticamente
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      const updatedUserData = response.data.user // Supondo que a API retorne o usuário atualizado

      // Atualizamos o estado local e o localStorage com os novos dados
      localStorage.setItem('user', JSON.stringify(updatedUserData))
      setUser(updatedUserData)

      // Retornamos os dados atualizados caso o componente queira usá-los
      return updatedUserData
    } catch (error) {
      // Lançamos o erro para que a página de perfil possa exibi-lo
      throw new Error(
        error.response?.data?.message || 'Erro ao atualizar o perfil'
      )
    }
  }
  // ==================================================================
  // NOVO CÓDIGO TERMINA AQUI
  // ==================================================================

  const value = {
    user,
    token,
    login,
    logout,
    registerUser,
    updateUserProfile, // <--- Adicionamos a nova função aqui
    isAuthenticated: !!token,
    role: user?.role || null
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
