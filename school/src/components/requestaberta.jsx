// src/components/requestaberta.jsx
import React, { useState } from 'react'
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
        onDelete?.(data.id) // Atualiza a lista na página pai
        onClose() // Fecha o card
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
      `Tem certeza que deseja ${
        newStatus === 'approved' ? 'APROVAR' : 'RECUSAR'
      } esta requisição?`
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
        // Notifica o componente pai (Request.jsx) sobre a mudança
        onUpdate?.({ ...data, status: newStatus })
        alert(
          `Requisição ${
            newStatus === 'approved' ? 'aprovada' : 'recusada'
          } com sucesso!`
        )
        onClose() // Fecha o modal
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

  if (!data) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-[#ebeff3] rounded-2xl p-8 md:p-10 w-full max-w-4xl max-h-[90vh] relative shadow-2xl flex flex-col'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-600 hover:text-black'
        >
          <span className='material-symbols-outlined text-3xl cursor-pointer'>
            close
          </span>
        </button>

        <div className='overflow-y-auto pr-4 -mr-4'>
          <div className='flex flex-col md:flex-row justify-between'>
            {/* Coluna Esquerda: Detalhes principais */}
            <div className='w-full md:w-2/3'>
              <p className='text-gray-600 text-2xl font-medium'>
                {data.responsavel}
              </p>
              <h1 className='text-4xl font-bold my-2 break-words'>
                {data.title}
              </h1>
              <p className='text-gray-500 text-lg font-medium'>REQ-{data.id}</p>
              <div className='mt-4'>{getStatusBadge(data.status)}</div>

              <h2 className='text-xl font-bold mt-10 mb-2'>
                Descrição da Requisição
              </h2>
              <p className='text-lg whitespace-pre-line bg-white p-4 rounded-lg shadow-sm'>
                {data.descricao}
              </p>

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

            {/* Coluna Direita: Metadados */}
            <div className='md:text-right mt-8 md:mt-0 md:pl-8'>
              <div className='flex flex-row justify-start items-center gap-2 md:justify-end'>
                <span className='material-symbols-outlined'>category</span>
                <h1 className='text-2xl font-medium'>{data.tipo}</h1>
              </div>
              <div className='flex flex-row justify-start items-center gap-2 mt-4 md:justify-end'>
                <span className='material-symbols-outlined'>bolt</span>
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
        </div>

        {/* Seção de Botões */}
        <div className='flex-shrink-0 flex justify-around items-center mt-10 pt-6 border-t border-gray-300'>
          {role === 'student' && (
            <>
              <button
                className='flex items-center gap-2 px-6 py-3 rounded-xl bg-[#d0d9e3] hover:bg-black hover:text-white cursor-pointer transition-colors disabled:bg-gray-400'
                onClick={handleEdit}
                disabled={isSubmitting}
              >
                <span className='material-symbols-outlined'>edit</span>
                <p className='text-xl font-bold'>EDITAR</p>
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className='flex items-center gap-2 px-6 py-3 rounded-xl bg-[#d0d9e3] hover:bg-red-600 hover:text-white cursor-pointer transition-colors disabled:bg-gray-400'
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
                disabled={isSubmitting || data.status !== 'pending'}
                className='flex items-center gap-2 px-8 py-3 rounded-xl bg-green-200 text-green-800 font-bold hover:bg-green-600 hover:text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600'
              >
                <span className='material-symbols-outlined'>thumb_up</span>
                <p className='text-xl'>APROVAR</p>
              </button>

              <button
                onClick={() => handleStatusUpdate('rejected')}
                disabled={isSubmitting || data.status !== 'pending'}
                className='flex items-center gap-2 px-8 py-3 rounded-xl bg-red-200 text-red-800 font-bold hover:bg-red-600 hover:text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600'
              >
                <span className='material-symbols-outlined'>thumb_down</span>
                <p className='text-xl'>RECUSAR</p>
              </button>

              <button
                onClick={handleEdit}
                disabled={isSubmitting}
                className='flex items-center gap-2 px-6 py-3 rounded-xl bg-[#d0d9e3] hover:bg-black hover:text-white cursor-pointer transition-colors disabled:bg-gray-400'
              >
                <span className='material-symbols-outlined'>edit</span>
                <p className='text-xl font-bold'>EDITAR</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Requestaberta
