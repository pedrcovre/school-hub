import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const getStatusBadge = status => {
  const statusLower = status?.toLowerCase()
  switch (statusLower) {
    case 'pending':
      return (
        <span className='px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-800'>
          Pendente
        </span>
      )
    case 'approved':
      return (
        <span className='px-3 py-1 rounded-full text-sm font-semibold bg-green-200 text-green-800'>
          Aprovado
        </span>
      )
    case 'rejected':
      return (
        <span className='px-3 py-1 rounded-full text-sm font-semibold bg-red-200 text-red-800'>
          Recusado
        </span>
      )
    default:
      return (
        <span className='px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-800'>
          {status}
        </span>
      )
  }
}

const Requestaberta = ({ data, onClose, onDelete, onUpdate }) => {
  const { token, role } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [observation, setObservation] = useState('')

  useEffect(() => {
    setObservation(data.admin_observation || '')
  }, [data.admin_observation])

  const handleEdit = () => {
    navigate('/newrequest', { state: { requestData: data } })
    onClose()
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir esta requisição?'
    )
    if (!confirmDelete) return

    setIsSubmitting(true)
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${data.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.ok) {
        onDelete?.(data.id)
        onClose()
      } else {
        const errorData = await response.json()
        alert('Erro ao excluir: ' + errorData.error)
      }
    } catch (err) {
      console.error('Erro ao excluir requisição:', err)
      alert('Erro inesperado ao excluir.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStatusUpdate = async newStatus => {
    const confirmAction = window.confirm(
      `Tem certeza que deseja alterar o status para ${
        newStatus === 'approved' ? 'APROVADO' : 'RECUSADO'
      }?`
    )
    if (!confirmAction) return

    setIsSubmitting(true)
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${data.id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus })
        }
      )

      if (response.ok) {
        onUpdate?.({ ...data, status: newStatus })
        alert(
          `Requisição alterada para ${
            newStatus === 'approved' ? 'aprovada' : 'recusada'
          } com sucesso!`
        )
        onClose()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Falha ao atualizar o status.')
      }
    } catch (err) {
      console.error('Erro ao atualizar status:', err)
      alert(`Erro: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveObservation = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${data.id}/observation`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ observation: observation })
        }
      )

      if (response.ok) {
        onUpdate?.({ ...data, admin_observation: observation })
        alert('Observação salva com sucesso!')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Falha ao salvar a observação.')
      }
    } catch (err) {
      console.error('Erro ao salvar observação:', err)
      alert(`Erro: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!data) return null

  return (
    <div className='fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-[#ebeff3] rounded-lg p-8 md:p-10 w-full max-w-6xl max-h-6xl relative shadow-2xl flex flex-col'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-600 hover:text-black'
        >
          <span className='material-symbols-rounded text-3xl cursor-pointer'>
            close
          </span>
        </button>

        <div className='overflow-y-auto pr-4 -mr-4'>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='w-full md:w-2/3'>
              <p className='text-gray-600 text-2xl font-medium'>
                {data.responsavel}
              </p>
              <h1 className='text-4xl font-bold my-2 break-words'>
                {data.title}
              </h1>
              <p className='text-gray-500 text-xl font-medium'>REQ-{data.id}</p>
              <div className='mt-6'>{getStatusBadge(data.status)}</div>

              <h2 className='text-xl font-bold mt-10 mb-2'>
                Descrição da Requisição
              </h2>
              <p className='text-lg whitespace-pre-line pt-4'>
                {data.descricao}
              </p>

              {data.admin_observation && (
                <div className='mt-8'>
                  <h2 className='text-xl font-bold mb-2'>
                    Observação do Administrador
                  </h2>
                  <p className='text-lg whitespace-pre-line bg-blue-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-400'>
                    {data.admin_observation}
                  </p>
                </div>
              )}

              {data.arquivo && (
                <div className='mt-6'>
                  <p className='text-lg font-medium'>Anexo:</p>
                  <a
                    href={data.arquivo}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 underline break-all hover:text-blue-800'
                  >
                    {data.arquivo.substring(data.arquivo.lastIndexOf('/') + 1)}
                  </a>
                </div>
              )}
            </div>

            <div className='md:text-right mt-8 md:mt-0 md:pl-8'>
              <div className='flex flex-row justify-start items-center gap-2 md:justify-end'>
                <span className='material-symbols-rounded'>category</span>
                <h1 className='text-2xl font-medium'>{data.tipo}</h1>
              </div>
              <div className='flex flex-row justify-start items-center gap-2 mt-4 md:justify-end'>
                <span className='material-symbols-rounded'>bolt</span>
                <h1 className='text-xl font-medium capitalize'>
                  Urgência: {data.urgency}
                </h1>
              </div>
              <p className='text-xl mt-6'>Data de início</p>
              <p className='text-xl font-semibold'>
                {new Date(data.data).toLocaleDateString()}
              </p>
            </div>
          </div>

          {role === 'admin' && (
            <div className='mt-8'>
              <h2 className='text-xl font-bold mb-2'>
                Escrever/Editar Observação
              </h2>
              <textarea
                rows={4}
                placeholder='Adicione uma observação para o aluno...'
                className='w-full p-3 rounded-lg border border-gray-300 active:border-outline-none focus:outline-gray-400'
                value={observation}
                onChange={e => setObservation(e.target.value)}
              />
              <button
                onClick={handleSaveObservation}
                disabled={isSubmitting}
                className='mt-2 flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
              >
                <span className='material-symbols-rounded'>save</span>
                Salvar Observação
              </button>
            </div>
          )}
        </div>

        <div className='flex-shrink-0 flex justify-around items-center mt-10 pt-6 border-t border-gray-300'>
          {role === 'student' && (
            <>
              <button
                className='flex items-center gap-2 px-20 py-5 rounded-lg bg-[#d0d9e3] hover:bg-black hover:text-white cursor-pointer transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600'
                onClick={handleEdit}
                disabled={isSubmitting || data.status !== 'pending'}
              >
                <span className='material-symbols-outlined'>edit</span>
                <p className='text-xl font-bold'>EDITAR</p>
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting || data.status !== 'pending'}
                className='flex items-center gap-2 px-20 py-5 rounded-lg bg-[#d0d9e3] hover:bg-red-600 hover:text-white cursor-pointer transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600'
              >
                <span className='material-symbols-outlined'>delete</span>
                <p className='text-xl font-bold'>EXCLUIR</p>
              </button>
            </>
          )}

          {role === 'admin' && (
            <div className='flex flex-wrap justify-center items-center gap-4 w-full'>
              <button
                onClick={() => handleStatusUpdate('approved')}
                disabled={isSubmitting || data.status === 'approved'}
                className='flex items-center gap-2 px-20 py-5 rounded-lg bg-green-200 text-green-800 font-bold hover:bg-green-600 hover:text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600'
              >
                <span className='material-symbols-outlined'>thumb_up</span>
                <p className='text-xl'>APROVAR</p>
              </button>

              <button
                onClick={() => handleStatusUpdate('rejected')}
                disabled={isSubmitting || data.status === 'rejected'}
                className='flex items-center gap-2 px-20 py-5 rounded-lg bg-red-200 text-red-800 font-bold hover:bg-red-600 hover:text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600'
              >
                <span className='material-symbols-outlined'>thumb_down</span>
                <p className='text-xl'>RECUSAR</p>
              </button>

              <button
                onClick={handleEdit}
                disabled={isSubmitting}
                className='flex items-center gap-2 px-20 py-5 rounded-lg bg-[#d0d9e3] hover:bg-black hover:text-white cursor-pointer transition-colors disabled:bg-gray-400'
              >
                <p className='text-xl font-bold'>ADICIONAR RECURSO</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Requestaberta
