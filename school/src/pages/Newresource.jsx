import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

const NewResource = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { requestId } = useParams() // Pega o id da requisição da URL
  const [attachedFileName, setAttachedFileName] = useState(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const inputClassName =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'

  const onSubmit = async (data) => {
    if (!requestId) {
      alert('ID da requisição inválido')
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()

      formData.append('request_id', requestId)
      formData.append('type', data.resourceType)
      formData.append('name', data.resourceName)

      if (data.resourceQuantity) formData.append('quantity', data.resourceQuantity)
      if (data.resourceLink) formData.append('link', data.resourceLink)

      // O campo deve ser "resourceFile", pois o multer espera esse nome
      if (data.resourceFile && data.resourceFile[0]) {
        formData.append('resourceFile', data.resourceFile[0])
      }

      await axios.post(
        'http://localhost:5000/api/requests/resources',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        }
      )

      setLoading(false)
      navigate(`/requests/${requestId}`) // redireciona para detalhes da requisição
    } catch (error) {
      setLoading(false)
      console.error(error)
      alert('Erro ao salvar recurso. Veja console para detalhes.')
    }
  }

  return (
    <div className='flex items-center justify-center p-4 sm:p-6 lg:p-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='lg:grid lg:grid-cols-2'>
          <div className='p-8 sm:p-12'>
            <div className='mb-6'>
              <h1 className='text-3xl font-bold text-gray-900'>Adicionar Recurso</h1>
              <p className='mt-2 text-gray-600'>Preencha as informações do recurso que o aluno vai usar.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div className='border-t border-gray-300 pt-6 mt-8'>
                <h2 className='text-xl font-semibold mb-4'>Recurso Relacionado</h2>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-medium text-black mb-1'>Tipo do Recurso*</label>
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
                      <p className='text-red-600 text-sm mt-1'>{errors.resourceType.message}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-black mb-1'>Nome do Recurso*</label>
                    <input
                      type='text'
                      className={inputClassName}
                      placeholder='Ex: Manual de instalação'
                      {...register('resourceName', { required: 'Obrigatório' })}
                    />
                    {errors.resourceName && (
                      <p className='text-red-600 text-sm mt-1'>{errors.resourceName.message}</p>
                    )}
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4'>
                  <div>
                    <label className='block text-sm font-medium text-black mb-1'>Quantidade</label>
                    <input
                      type='number'
                      min='1'
                      className={inputClassName}
                      {...register('resourceQuantity')}
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-black mb-1'>Link (se aplicável)</label>
                    <input
                      type='url'
                      placeholder='https://...'
                      className={inputClassName}
                      {...register('resourceLink')}
                    />
                  </div>
                </div>

                <div className='mt-4'>
                  <label className='block text-sm font-medium text-black mb-1'>Anexo de Arquivo (opcional)</label>
                  <input
                    type='file'
                    {...register('resourceFile')}
                    onChange={(e) => setAttachedFileName(e.target.files[0]?.name || null)}
                    className='block w-full text-sm text-gray-600 mt-1'
                  />
                  {attachedFileName && (
                    <p className='text-sm text-gray-700 mt-1'>Arquivo selecionado: {attachedFileName}</p>
                  )}
                </div>

                <div className='mt-6 flex gap-4'>
                  <button
                    type='submit'
                    disabled={loading}
                    className={`flex-1 justify-center py-2 px-4 rounded-lg text-white font-medium ${
                      loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {loading ? 'Salvando...' : 'Salvar Recurso'}
                  </button>
                  <button
                    type='button'
                    onClick={() => navigate(-1)}
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
