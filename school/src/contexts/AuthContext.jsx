import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

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
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      })
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
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password
      })
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

  const updateUserProfile = async updates => {
    const formData = new FormData()

    if (updates.profileImage) {
      formData.append('profileImage', updates.profileImage)
    }
    if (updates.currentPassword) {
      formData.append('currentPassword', updates.currentPassword)
    }
    if (updates.newPassword) {
      formData.append('newPassword', updates.newPassword)
    }

    try {
      const response = await axios.patch(
        `${API_URL}/api/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      const updatedUser = response.data.user

      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))

      return updatedUser
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erro no servidor ao atualizar o perfil'
      )
    }
  }

  const sendPasswordResetEmail = async email => {
    try {
      await axios.post(`${API_URL}/api/auth/forgot-password`, { email })
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Erro ao enviar e-mail de redefinição'
      )
    }
  }

  const resetPassword = async (token, password) => {
    try {
      await axios.post(`${API_URL}/api/auth/reset-password/${token}`, {
        password: password
      })
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Erro ao redefinir a senha'
      )
    }
  }

  const value = {
    user,
    token,
    login,
    logout,
    registerUser,
    updateUserProfile,
    sendPasswordResetEmail,
    resetPassword,
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
