import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Register, Login, Resource, Request, Layout, ProtectedRoute } from './components'

const AppRoutes = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
      <Route
        path='/register'
        element={user ? <Navigate to='/' /> : <Register />}
      />

      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Resource />} />
      </Route>

      <Route path='*' element={<Navigate to={user ? '/' : '/login'} />} />
    </Routes>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
