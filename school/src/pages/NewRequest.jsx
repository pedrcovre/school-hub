import { useForm } from 'react-hook-form'
import { useState } from 'react'

const NewRequest = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      titulo: '',
      tipo: '',
      motivo: '',
      quantidade: '',
      urgencia: ''
    }
  })

  const anexoFile = watch('anexo')
  const anexoFileName = anexoFile?.[0]?.name

  const onSubmit = async data => {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (key === 'anexo') {
        formData.append(key, data.anexo[0])
      } else {
        formData.append(key, data[key])
      }
    })

    console.log('Dados prontos para enviar:', Object.fromEntries(formData))

    await new Promise(resolve => setTimeout(resolve, 1500))

    // try {
    //   await axios.post('/api/requests', formData);
    //   alert('Requisição enviada com sucesso!');
    // } catch (error) {
    //   alert('Falha ao enviar a requisição.');
    // }
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
                  {...register('titulo', {
                    required: 'O título é obrigatório'
                  })}
                />
                {errors.titulo && (
                  <p className='text-red-600 text-sm mt-1'>
                    {errors.titulo.message}
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
                    {...register('tipo', { required: 'Selecione um tipo' })}
                  >
                    <option value='' disabled>
                      Selecione...
                    </option>
                    <option value='equipamento'>Equipamento</option>
                    <option value='suporte'>Suporte TI</option>
                    <option value='software'>Software</option>
                    <option value='treinamento'>Treinamento</option>
                  </select>
                  {errors.tipo && (
                    <p className='text-red-600 text-sm mt-1'>
                      {errors.tipo.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-black mb-1'>
                    Urgência*
                  </label>
                  <select
                    className={inputClassName}
                    {...register('urgencia', {
                      required: 'Selecione a urgência'
                    })}
                  >
                    <option value='' disabled>
                      Selecione...
                    </option>
                    <option value='baixa'>Baixa</option>
                    <option value='media'>Média</option>
                    <option value='alta'>Alta</option>
                  </select>
                  {errors.urgencia && (
                    <p className='text-red-600 text-sm mt-1'>
                      {errors.urgencia.message}
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
                  {...register('motivo', {
                    required: 'O motivo é obrigatório'
                  })}
                />
                {errors.motivo && (
                  <p className='text-red-600 text-sm mt-1'>
                    {errors.motivo.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-black mb-1'>
                  Anexo (Opcional)
                </label>
                <label
                  htmlFor='anexo'
                  className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'
                >
                  <div className='flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-500 transition-colors rounded-lg p-6 text-center'>
                    <span className='material-symbols-rounded text-gray-700'>
                      upload_file
                    </span>
                    <span className='ml-3 text-sm text-gray-600'>
                      {anexoFileName || 'Clique para fazer upload'}
                    </span>
                  </div>
                  <input
                    id='anexo'
                    type='file'
                    className='sr-only'
                    {...register('anexo')}
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
