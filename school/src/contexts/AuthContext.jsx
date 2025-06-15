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

  const updateUserProfile = async updates => {
    const formData = new FormData()

    if (updates.profileImage) {
      formData.append('profileImage', updates.profileImage)
    }
    if (updates.newPassword) {
      formData.append('currentPassword', updates.currentPassword)
      formData.append('newPassword', updates.newPassword)
    }

    try {
      const response = await axios.patch(
        'http://localhost:5000/api/users/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      const updatedUserData = response.data.user
      localStorage.setItem('user', JSON.stringify(updatedUserData))
      setUser(updatedUserData)

      return updatedUserData
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Erro ao atualizar o perfil'
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
