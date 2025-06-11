import { useForm } from 'react-hook-form'
import PasswordInput from '../components/PasswordInput'
import EmailInput from '../components/EmailInput'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    console.log('Form enviado:', data)
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
            Crie uma conta
          </h1>
          <p className='text-[13px] whitespace-nowrap'>
            Bem-vindo, preencha as informações
          </p>
        </div>

        <div className='flex flex-col items-center mt-10 w-full'>
          <div className='w-full max-w-[450px] mb-6'>
            <label className='mb-2 font-medium block'>Matrícula</label>
            <input
              {...register('matricula', { required: 'Campo obrigatório' })}
              type='text'
              placeholder='Digite sua matrícula'
              className={`w-full h-[60px] p-3 border rounded-lg focus:outline-none ${
                errors.matricula ? 'border-red-500' : 'border-black/20'
              }`}
            />
            {errors.matricula && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.matricula.message}
              </p>
            )}
          </div>

          <EmailInput register={register} errors={errors} />

          <PasswordInput register={register} errors={errors} />

          <div className='w-full max-w-[450px] mt-12'>
            <button
              type='submit'
              className='w-full h-[52px] bg-[#5CA4F5] rounded-lg text-white text-sm font-medium mb-4 cursor-pointer transition-all duration-200 hover:bg-blue-600 hover:h-[56px]'
            >
              Entrar
            </button>
          </div>

          <div className='text-[15px] mt-2'>
            Já tem uma conta?
            <a className='text-black/60 underline font-medium cursor-pointer'>
              Acesse sua conta
            </a>
          </div>

          <footer className='text-sm mt-10 text-center w-full max-w-[450px]'>
            © 2025 School Hub. Todos os direitos reservados.
          </footer>
        </div>
      </form>

      <div className='hidden lg:block mr-[36px] w-1/2 h-screen'>
        <img
          src='/src/assets/image-register.jpg'
          alt='Foto Pessoas'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>
    </div>
  )
}

export default Register
