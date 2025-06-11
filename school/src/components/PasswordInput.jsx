import { useState } from 'react'

const PasswordInput = ({ register, errors, watch, isConfirm = false }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleVisibility = () => setShowPassword(!showPassword)

  const fieldName = isConfirm ? 'confirmPassword' : 'password'
  const label = isConfirm ? 'Confirme sua senha' : 'Senha'
  const placeholder = isConfirm
    ? 'Digite novamente a senha'
    : 'Digite sua senha'

  return (
    <div className='w-full max-w-[450px]'>
      <p className='mb-2 font-medium'>{label}</p>
      <div className='relative'>
        <input
          {...register(fieldName, {
            required: 'Campo obrigatório',
            ...(isConfirm && {
              validate: value =>
                value === watch('password') || 'As senhas não coincidem'
            }),
            minLength: {
              value: 6,
              message: 'A senha deve ter no mínimo 6 caracteres'
            }
          })}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={`w-full h-[60px] p-3 border rounded-lg focus:outline-none ${
            errors[fieldName] ? 'border-red-500' : 'border-black/20'
          }`}
        />
        <button
          type='button'
          onClick={toggleVisibility}
          className='absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-600'
        >
          <span className='material-symbols-rounded'>
          {showPassword ? 'visibility' : 'visibility_off'}
          </span>
        </button>
      </div>
      {errors[fieldName] && (
        <p className='text-red-500 text-sm mt-1'>{errors[fieldName].message}</p>
      )}
    </div>
  )
}

export default PasswordInput
