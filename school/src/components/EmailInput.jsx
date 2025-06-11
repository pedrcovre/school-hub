const EmailInput = ({ register, errors, label = 'Email' }) => (
  <div className='w-full max-w-[450px] mb-6'>
    <label className='block mb-2 font-medium'>{label}</label>
    <input
      type='email'
      placeholder='Digite seu email'
      {...register('email', {
        required: 'Campo obrigatório',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Email inválido'
        }
      })}
      className='w-full h-[60px] bg-white border border-black/20 rounded-lg p-3 focus:outline-none'
    />
    {errors.email && (
      <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
    )}
  </div>
)

export default EmailInput
