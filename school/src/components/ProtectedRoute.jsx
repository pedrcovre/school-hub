import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * @param {object} props 
 * @param {React.ReactNode} props.children 
 */

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth() 
  const location = useLocation() 

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        Carregando...
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
