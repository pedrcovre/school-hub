import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import {
  Register,
  Login,
  Resource,
  Request,
  Layout,
  ProtectedRoute,
  NewRequest
} from './components';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
      <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />

      {/* Rota principal que contém o Layout e as páginas protegidas */}
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* AQUI ESTÁ A MUDANÇA PRINCIPAL */}
        {/* A rota "index" define o que é renderizado quando o caminho é exatamente "/" */}
        {/* Como /request é sua home, colocamos o componente Request aqui. */}
        <Route index element={<Request />} />

        {/* As outras rotas protegidas continuam como filhas */}
        <Route path='resource' element={<Resource />} />
        <Route path='newrequest' element={<NewRequest />} />
        {/* Não precisamos mais de uma rota "requests", pois a "index" já cuida disso. */}
      </Route>

      {/* Rota "Catch-all" que redireciona qualquer URL inválida */}
      <Route path='*' element={<Navigate to={user ? '/' : '/login'} />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;