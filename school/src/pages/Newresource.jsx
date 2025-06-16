import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const NewResource = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const requestData = location.state?.requestData

  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !link) {
      alert('Preencha todos os campos.')
      return
    }

    if (!requestData?.id) {
      alert('Requisição não encontrada.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          link,
          request_id: requestData.id,
        }),
      })

      if (response.ok) {
        alert('Recurso adicionado com sucesso!')
        navigate('/') // Volta para a página principal ou outra rota
      } else {
        const error = await response.json()
        alert('Erro ao adicionar recurso: ' + error.message)
      }
    } catch (err) {
      console.error(err)
      alert('Erro ao conectar com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ebeff3] p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Adicionar Recurso</h1>

        {requestData && (
          <div className="mb-6">
            <p className="text-lg">
              <strong>Requisição:</strong> {requestData.tipo} (ID: {requestData.id})
            </p>
            <p className="text-gray-600">{requestData.descricao}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-medium mb-1">Nome do recurso</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Documentação do sistema"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">Link do recurso</label>
            <input
              type="url"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://exemplo.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-lg transition"
          >
            {loading ? 'Enviando...' : 'Adicionar Recurso'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewResource
