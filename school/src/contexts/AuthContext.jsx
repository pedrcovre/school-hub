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
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
 
};

export const useAuth = () => {
  return useContext(AuthContext)
}
