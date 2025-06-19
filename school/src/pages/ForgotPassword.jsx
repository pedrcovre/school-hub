

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext' 
import EmailInput from '../components/EmailInput' 

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { sendPasswordResetEmail } = useAuth() 
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const onSubmit = async data => {
    setIsLoading(true)
    setMessage('')
    try {
      await sendPasswordResetEmail(data.email)
      setMessage(
        'Se um usuário com este e-mail existir, um link para redefinição de senha foi enviado.'
      )
    } catch (error) {
      setMessage(
        'Se um usuário com este e-mail existir, um link para redefinição de senha foi enviado.'
      )
      console.error('Erro ao solicitar redefinição de senha:', error)
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
          <h1 className='text-[32px] lg:text-[40px] font-medium text-center'>
            Esqueceu sua senha?
          </h1>
          <p className='text-[13px] whitespace-nowrap text-center mt-2'>
            Não se preocupe! Digite seu e-mail para receber as instruções.
          </p>
        </div>

        <div className='flex flex-col items-center mt-10 w-full'>
          <EmailInput register={register} errors={errors} />

          <div className='w-full max-w-[450px] mt-6'>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full h-[52px] bg-[#5CA4F5] rounded-lg text-white text-sm font-medium mb-4 cursor-pointer transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-400'
            >
              {isLoading ? 'Enviando...' : 'Enviar Link de Redefinição'}
            </button>
          </div>

          {message && (
            <p className='text-green-600 text-sm mt-2 text-center'>{message}</p>
          )}

          <div className='text-sm mt-4'>
            Lembrou a senha?
            <Link
              to='/login'
              className='text-black/60 underline font-medium cursor-pointer ml-1 hover:text-blue-600'
            >
              Faça login
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

export default ForgotPassword
