import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const NewResource = () => {

  const onSubmit = async (data) => {
    try {
      console.log(data)
      // Lógica para salvar os dados
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex items-center justify-center p-4 sm:p-6 lg:p-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='lg:grid lg:grid-cols-2'>
          <div className='p-8 sm:p-12'>
            <div className='mb-6'>
              <h1 className='text-3xl font-bold text-gray-900'>
                Adicionar Recursos
              </h1>
              <p className='mt-2 text-gray-600'>
                Preencha as informações do que o Aluno vai usar.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>

              <div className='border-t border-gray-300 pt-6 mt-8'>
                <h2 className='text-xl font-semibold mb-4'>Recurso Relacionado</h2>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-medium text-black mb-1'>
                      Tipo do Recurso*
                    </label>
                    <select
                      className={inputClassName}
                      {...register('resourceType', { required: 'Obrigatório' })}
                    >
                      <option value=''>Selecione...</option>
                      <option value='arquivo'>Arquivo</option>
                      <option value='link'>Link</option>
                      <option value='outro'>Outro</option>
                    </select>
                    {errors.resourceType && (
                      <p className='text-red-600 text-sm mt-1'>
                        {errors.resourceType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-black mb-1'>
                      Nome do Recurso*
                    </label>
                    <input
                      type='text'
                      className={inputClassName}
                      placeholder='Ex: Manual de instalação'
                      {...register('resourceName', { required: 'Obrigatório' })}
                    />
                    {errors.resourceName && (
                      <p className='text-red-600 text-sm mt-1'>
                        {errors.resourceName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4'>
                  <div>
                    <label className='block text-sm font-medium text-black mb-1'>
                      Quantidade
                    </label>
                    <input
                      type='number'
                      min='1'
                      className={inputClassName}
                      {...register('resourceQuantity')}
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-black mb-1'>
                      Link (se aplicável)
                    </label>
                    <input
                      type='url'
                      placeholder='https://...'
                      className={inputClassName}
                      {...register('resourceLink')}
                    />
                  </div>
                </div>

                <div className='mt-4'>
                  <label className='block text-sm font-medium text-black mb-1'>
                    Anexo de Arquivo (opcional)
                  </label>
                  <input
                    type='file'
                    {...register('resourceFile')}
                    onChange={(e) =>
                      setAttachedFileName(e.target.files[0]?.name || null)
                    }
                    className='block w-full text-sm text-gray-600 mt-1'
                  />
                  {attachedFileName && (
                    <p className='text-sm text-gray-700 mt-1'>
                      Arquivo selecionado: {attachedFileName}
                    </p>
                  )}
                </div>

                <div className='mt-6 flex gap-4'>
                  <button
                    type='submit'
                    className='flex-1 justify-center py-2 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium'
                  >
                    Salvar Recurso
                  </button>
                  <button
                    type='button'
                    className='flex-1 justify-center py-2 px-4 rounded-lg text-black bg-gray-200 hover:bg-gray-300 font-medium'
                  >
                    Cancelar
                  </button>
                </div>
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

export default NewResource
