import { useState } from 'react'

const Login = () => {
  const [visibility, setVisibility] = useState({})

  return (
    <div class='m-[30px]'>
      <img src='src/assets/logo.svg' alt='Logo' class='w-[35px] h-[34px]' />
      <div class='ml-[370px] mt-[150px] '>
        <div class='flex flex-col justify-center mt-[100px] m-[50px]'>
          <h1 class='text-[40px] font-medium flex justify-items-center'>
            Acesse sua conta
          </h1>
          <p class=' text-[15px]'>
            Bem-vindo de volta, preencha as informações
          </p>
        </div>
        <div class='flex flex-col justify-center'>
          <p class=''>Email</p>
          <input
            type='email'
            placeholder='Digite seu email'
            class='w-[450px] h-[60px]  bg-white border-solid border-1 border-black/20 focus:outline-none rounded-lg p-3 mb-[35px]'
          />
          <div class='flex flex-col justify-center'>
            <p>Senha</p>
            <div class='relative w-[450px] mb-[10px]'>
              <input
                type={visibility.password ? 'text' : 'password'}
                placeholder='Digite sua senha'
                class='w-full h-[60px] bg-white border border-black/20 rounded-lg p-3 pr-12 focus:outline-none'
              />
              <button
                type='button'
                onClick={() =>
                  setVisibility({
                    ...visibility,
                    password: !visibility.password
                  })
                }
                class='absolute inset-y-0 right-0 flex items-center pr-3 '
              >
                <span class='material-symbols-rounded absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer'>
                  {visibility.password ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
            <a class='text-[14px] text-[#395f8b73] mb-[35px]'>
              Esqueceu sua senha?
            </a>
          </div>
          <div class='flex flex-col justify-center'>
            <button class='w-[450px] h-[52px] bg-[#5CA4F5] rounded-lg text-white  text-[15px] font-medium mb-4 duration-500'>
              Entrar
            </button>
          </div>
          <div class='flex flex-col justify-center'>
            <p class=' text-[15px]'>
              Não tem uma conta?{' '}
              <a class='text-[#395f8b] font-medium'>Cadastre-se</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
