import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import PasswordInput from '../components/PasswordInput'

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const { resetPassword } = useAuth()
  const { token } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onSubmit = async data => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    if (!token) {
      setError('Token de redefinição inválido ou ausente.')
      setIsLoading(false)
      return
    }

    try {
      await resetPassword(token, data.password)

      setSuccess(
        'Senha alterada com sucesso! Você será redirecionado para o login.'
      )
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.message || 'Ocorreu um erro. O link pode ter expirado.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col lg:flex-row min-h-screen select-none m-[20px] lg:m-[30px]'>
      <div className='mb-6 lg:mb-0'>
        <img src='/logo.svg' alt='Logo' className='w-14 mb-4 lg:mb-0' />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center w-full lg:w-1/2 px-4 lg:px-10'
      >
        <h1 className='text-[32px] lg:text-[40px] font-medium mb-8'>
          Crie sua nova senha
        </h1>

        <div className='w-full max-w-[450px] space-y-6'>
          <PasswordInput register={register} errors={errors} watch={watch} />
          <PasswordInput
            register={register}
            errors={errors}
            watch={watch}
            isConfirm
          />

          <button
            type='submit'
            disabled={isLoading || !!success}
            className='w-full h-[52px] bg-blue-500 rounded-lg text-white text-sm font-medium transition-colors duration-200 hover:bg-blue-600 disabled:bg-gray-400 mt-4'
          >
            {isLoading ? 'Salvando...' : 'Salvar Nova Senha'}
          </button>
        </div>

        {error && (
          <p className='text-red-500 text-sm mt-4 text-center'>{error}</p>
        )}
        {success && (
          <p className='text-green-600 text-sm mt-4 text-center'>{success}</p>
        )}

        <footer className='text-sm mt-10 text-center w-full max-w-[450px]'>
          © 2025 School Hub. Todos os direitos reservados.
        </footer>
      </form>

      <div className='hidden lg:flex w-1/2 items-center justify-center'>
        <img
          src='/src/assets/image-change-password.jpg'
          alt='Icone Senha'
          className='w-[550px] h-[650px] object-cover rounded-lg'
        />
      </div>
    </div>
  )
}

export default ResetPassword
