import { useState } from 'react'

const Login = () => {
  const [visibility, setVisibility] = useState({ password: false })

  return (
    <div className='m-[30px]'>
      <img src='./logo.svg' alt='Logo' className='w-[35px] h-[34px]' />
      <div className='ml-[370px] mt-[150px]'>
        <div className='flex flex-col justify-center mt-[100px] m-[50px]'>
          <h1 className='text-[40px] font-medium'>Acesse sua conta</h1>
          <p className='text-[15px]'>
            Bem-vindo de volta, preencha as informações
          </p>
        </div>

        <div className='flex flex-col justify-center'>
          <label className='mb-1'>Email</label>
          <input
            type='email'
            placeholder='Digite seu email'
            className='w-[450px] h-[60px] bg-white border border-black/20 focus:outline-none rounded-lg p-3 mb-[35px]'
          />

          <label className='mb-1'>Senha</label>
          <div className='relative w-[450px] mb-[10px]'>
            <input
              type={visibility.password ? 'text' : 'password'}
              placeholder='Digite sua senha'
              className='w-full h-[60px] bg-white border border-black/20 rounded-lg p-3 pr-12 focus:outline-none'
            />
            <button
              type='button'
              onClick={() =>
                setVisibility(prev => ({ ...prev, password: !prev.password }))
              }
              className='absolute inset-y-0 right-0 flex items-center pr-3'
            >
              <span className='material-symbols-rounded text-gray-500 cursor-pointer'>
                {visibility.password ? 'visibility' : 'visibility_off'}
              </span>
            </button>
          </div>

          <a href='#' className='text-[14px] text-[#395f8b73] mb-[35px]'>
            Esqueceu sua senha?
          </a>

          <button className='w-[450px] h-[52px] bg-[#5CA4F5] rounded-lg text-white text-[15px] font-medium mb-4 duration-500'>
            Entrar
          </button>

          <p className='text-[15px]'>
            Não tem uma conta?{' '}
            <a href='#' className='text-[#395f8b] font-medium'>
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
