import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import EmailInput from '../components/EmailInput'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const onSubmit = async data => {
    setIsLoading(true)
    setLoginError('')
    try {
      await login(data.email, data.password)
    } catch (error) {
      setLoginError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col lg:flex-row min-h-screen select-none m-[20px] lg:m-[30px]'>
      <div>
        <img src='/logo.svg' alt='Logo' className='w-14 mb-4 lg:mb-0' />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center lg:items-start lg:ml-[160px] mt-[30px] w-full lg:w-1/2'
      >
        <div className='flex flex-col items-center mt-[60px] lg:mt-[100px] w-full'>
          <h1 className='text-[32px] lg:text-[40px] font-medium'>
            Acesse sua conta
          </h1>
          <p className='text-[13px] whitespace-nowrap'>
            Bem-vindo de volta, preencha as informações
          </p>
        </div>

        <div className='flex flex-col items-center mt-10 w-full'>
          <EmailInput register={register} errors={errors} />
          <div className='w-full max-w-[450px]'>
            <PasswordInput register={register} errors={errors} />

            <Link
              to='/change-password'
              className='text-sm text-black/60 underline cursor-pointer inline-block hover:text-blue-600'
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <div className='w-full max-w-[450px] mt-6'>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full h-[52px] bg-[#5CA4F5] rounded-lg text-white text-sm font-medium mb-4 cursor-pointer transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-400'
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          {loginError && (
            <p className='text-red-500 text-sm mt-2'>{loginError}</p>
          )}

          <div className='text-sm mt-2'>
            Não tem uma conta?
            <Link
              to='/register'
              className='text-black/60 underline font-medium cursor-pointer ml-1 hover:text-blue-600'
            >
              Cadastre-se
            </Link>
          </div>

          <footer className='text-sm mt-10 text-center w-full max-w-[450px]'>
            © 2025 School Hub. Todos os direitos reservados.
          </footer>
        </div>
      </form>

      <div className='hidden lg:block mr-2 w-1/2 h-screen'>
        <img
          src='/src/assets/image-login.jpg'
          alt='Foto Pessoas'
          className='w-full h-[860px] object-cover rounded-lg'
        />
      </div>
    </div>
  )
}

export default Login
