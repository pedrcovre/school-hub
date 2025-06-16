// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { SearchProvider } from './contexts/SearchContext'
import {
  Register,
  Login,
  Resource,
  Request,
  Layout,
  ProtectedRoute,
  NewRequest,
  ChangePassword,
  ProfilePage
} from './components'

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
        path='/change-password'
        element={user ? <Navigate to='/' /> : <ChangePassword />}
      />

      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Request />} />
        <Route path='resource' element={<Resource />} />
        <Route path='newrequest' element={<NewRequest />} />

        <Route path='profile' element={<ProfilePage />} />
      </Route>

      <Route path='*' element={<Navigate to={user ? '/' : '/login'} />} />
    </Routes>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
  )
}

export default App
