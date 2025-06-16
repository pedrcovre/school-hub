import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

const NewRequest = () => {
  const { user, token } = useAuth() 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      type: '',
      reason: '',
      urgency: '',
      file: null
    }
  })

  const attachedFile = watch('file')
  const attachedFileName = attachedFile?.[0]?.name

  const onSubmit = async data => {
    const formData = new FormData()

    formData.append('student_id', user.id)
    formData.append('title', data.title)
    formData.append('type', data.type)
    formData.append('reason', data.reason)
    formData.append('urgency', data.urgency)

    if (data.file && data.file[0]) {
      formData.append('file', data.file[0])
    }

    try {
      // 2. Adicione o cabeçalho (header) de autorização na chamada POST
      await axios.post('http://localhost:5000/api/requests', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      alert('Requisição enviada com sucesso!')
    } catch (error) {
      console.error('Erro ao enviar requisição:', error)
      alert(
        'Falha ao enviar a requisição. Verifique o console para mais detalhes.'
      )
    }
  }

  const inputClassName =
    'block w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-gray-500 sm:text-sm text-base py-3 px-4 focus:outline-none'

  return (
    <div className='flex items-center justify-center p-4 sm:p-6 lg:p-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='lg:grid lg:grid-cols-2'>
          <div className='p-8 sm:p-12'>
            <div className='mb-6'>
              <h1 className='text-3xl font-bold text-gray-900'>
                Nova Requisição
              </h1>
              <p className='mt-2 text-gray-600'>
                Preencha os dados para que possamos resolver seu problema.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-black mb-1'>
                  Título*
                </label>
                <input
                  type='text'
                  placeholder='Ex: Instalação do Adobe Photoshop'
                  className={inputClassName}
                  {...register('title', {
                    required: 'O título é obrigatório'
                  })}
                />
                {errors.title && (
                  <p className='text-red-600 text-sm mt-1'>
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div>
                  <label className='block text-sm font-medium text-black mb-1'>
                    Tipo da Requisição*
                  </label>
                  <select
                    className={inputClassName}
                    {...register('type', { required: 'Selecione um tipo' })}
                  >
                    <option value='' disabled>
                      Selecione...
                    </option>
                    <option value='equipamento'>Equipamento</option>
                    <option value='suporte'>Suporte TI</option>
                    <option value='software'>Software</option>
                    <option value='treinamento'>Treinamento</option>
                  </select>
                  {errors.type && (
                    <p className='text-red-600 text-sm mt-1'>
                      {errors.type.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-black mb-1'>
                    Urgência*
                  </label>
                  <select
                    className={inputClassName}
                    {...register('urgency', {
                      required: 'Selecione a urgência'
                    })}
                  >
                    <option value='' disabled>
                      Selecione...
                    </option>
                    <option value='low'>Baixa</option>
                    <option value='medium'>Média</option>
                    <option value='high'>Alta</option>
                  </select>
                  {errors.urgency && (
                    <p className='text-red-600 text-sm mt-1'>
                      {errors.urgency.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-black mb-1'>
                  Motivo*
                </label>
                <textarea
                  rows={4}
                  placeholder='Descreva em detalhes o motivo da sua solicitação...'
                  className={inputClassName}
                  {...register('reason', {
                    required: 'O motivo é obrigatório'
                  })}
                />
                {errors.reason && (
                  <p className='text-red-600 text-sm mt-1'>
                    {errors.reason.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-black mb-1'>
                  Anexo (Opcional)
                </label>
                <label
                  htmlFor='file'
                  className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'
                >
                  <div className='flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-500 transition-colors rounded-lg p-6 text-center'>
                    <span className='material-symbols-rounded text-gray-700'>
                      upload_file
                    </span>
                    <span className='ml-3 text-sm text-gray-600'>
                      {attachedFileName || 'Clique para fazer upload'}
                    </span>
                  </div>
                  <input
                    id='file'
                    type='file'
                    className='sr-only'
                    {...register('file')}
                  />
                </label>
              </div>

              <div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Requisição'}
                </button>
              </div>
            </form>
          </div>

          <div className='hidden lg:block'>
            <img
              src='/src/assets/image-request.png'
              alt='Pessoas colaborando em um projeto'
              className='w-full h-[758px] object-cover rounded-lg'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRequest
