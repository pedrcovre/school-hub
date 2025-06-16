// src/pages/Request.jsx
import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSearch } from '../contexts/SearchContext'
import axios from 'axios'
import Requestaberta from '../components/RequestModal'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const StatusBadge = ({ status }) => {
  let colorClass = ''
  let label = ''

  switch (status?.toLowerCase()) {
    case 'pending':
      colorClass = 'bg-gray-100 text-gray-800'
      label = 'Pendente'
      break
    case 'approved':
      colorClass = 'bg-green-100 text-green-800'
      label = 'Aprovado'
      break
    case 'rejected':
      colorClass = 'bg-red-100 text-red-800'
      label = 'Recusado'
      break
    default:
      colorClass = 'bg-gray-100 text-gray-800'
      label = status
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}
    >
      {label}
    </span>
  )
}

const ITEMS_PER_PAGE = 5
const TABS = ['Todos', 'Aberta', 'Fechado']

const Request = () => {
  const [requests, setRequests] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTab, setSelectedTab] = useState(TABS[0])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false) // Novo estado para loading
  const { role, token } = useAuth()
  const navigate = useNavigate()
  const { searchTerm } = useSearch()

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return
      try {
        const response = await axios.get(`${API_URL}/api/requests`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setRequests(response.data)
      } catch (error) {
        console.error('Erro ao buscar requisições:', error)
      }
    }
    fetchData()
  }, [token])

  // Nova função para buscar os detalhes completos da requisição
  const handleRequestClick = async requestId => {
    if (!token) return
    setIsLoadingDetails(true)
    try {
      const response = await axios.get(`${API_URL}/api/requests/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // Mapeia os dados do backend para os nomes esperados no frontend
      const data = {
        ...response.data,
        descricao: response.data.reason, // Renomeia 'reason' para 'descricao'
        arquivo: response.data.arquivo
          ? `${API_URL}/${response.data.arquivo.replace(/\\/g, '/')}`
          : null // Constrói a URL completa do arquivo
      }
      setSelectedRequest(data)
    } catch (error) {
      console.error('Erro ao buscar detalhes da requisição:', error)
      alert('Não foi possível carregar os detalhes da requisição.')
    } finally {
      setIsLoadingDetails(false)
    }
  }

  const filteredRequests = useMemo(() => {
    let filteredByTab = requests
    if (selectedTab === 'Aberta') {
      filteredByTab = requests.filter(r => r.status.toLowerCase() === 'pending')
    } else if (selectedTab === 'Fechado') {
      filteredByTab = requests.filter(
        r =>
          r.status.toLowerCase() === 'approved' ||
          r.status.toLowerCase() === 'rejected'
      )
    }
    if (!searchTerm) return filteredByTab
    return filteredByTab.filter(
      request =>
        request.id
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        request.tipo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.responsavel?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [requests, selectedTab, searchTerm])

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredRequests, currentPage])

  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE)
  const actionText = role === 'admin' ? 'Ver/Editar' : 'Ver'
  const responsibleHeaderText = role === 'admin' ? 'Aluno' : 'Responsável'

  const handleTabClick = tab => {
    setSelectedTab(tab)
    setCurrentPage(1)
  }

  const handleUpdateRequest = updatedData => {
    // Atualiza a lista principal para refletir a mudança imediatamente
    setRequests(prev =>
      prev.map(req =>
        req.id === updatedData.id ? { ...req, ...updatedData } : req
      )
    )
    // Atualiza os dados no modal aberto
    setSelectedRequest(prev => ({ ...prev, ...updatedData }))
  }

  return (
    <div className='min-h-screen relative'>
      {/* Tela de Loading */}
      {isLoadingDetails && (
        <div className='fixed inset-0 bg-white/10 flex items-center justify-center z-[100]'>
          <p className='text-black text-3xl font-semibold'>
            Carregando detalhes...
          </p>
        </div>
      )}

      <div className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-8'>
          {role !== 'admin' && (
            <h1 className='text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-0'>
              Minhas Requisições
            </h1>
          )}
          {role !== 'student' && (
            <h1 className='text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-0'>
              Requisições
            </h1>
          )}

          {role !== 'admin' && (
            <button
              className='bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:bg-blue-600 transition-colors'
              onClick={() => navigate('/newrequest')}
            >
              Nova Requisição
            </button>
          )}
        </div>

        {/* Abas de Navegação */}
        <div className='border-b border-gray-200 mb-6'>
          <nav className='-mb-px flex space-x-6' aria-label='Tabs'>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`whitespace-nowrap py-2 px-0 border-b-4 font-medium transition-colors cursor-pointer ${
                  selectedTab === tab
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tabela de Requisições */}
        <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider'>
                    ID
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider'>
                    Tipo de Requisição
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider'>
                    Data
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider'>
                    {responsibleHeaderText}
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider'>
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {currentItems.map(item => (
                  <tr
                    key={item.id}
                    className='hover:bg-gray-50 transition-colors cursor-pointer'
                    onClick={() => handleRequestClick(item.id)} // Alterado aqui para chamar a nova função
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                      {item.id}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {item.tipo}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {new Date(item.data).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <StatusBadge status={item.status} />
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {item.responsavel}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-600 hover:underline'>
                      {actionText}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginação */}
        <div className='flex justify-center items-center mt-8 gap-4'>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className='px-3 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <span className='material-symbols-outlined text-lg'>
              arrow_back
            </span>
          </button>
          <span className='text-base font-medium text-gray-700'>
            Página {currentPage} de {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className='px-3 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <span className='material-symbols-outlined text-lg'>
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Modal/Card da Requisição Aberta */}
      {selectedRequest && (
        <Requestaberta
          data={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onDelete={deletedId => {
            setRequests(prev => prev.filter(req => req.id !== deletedId))
            setSelectedRequest(null)
          }}
          onUpdate={handleUpdateRequest}
        />
      )}
    </div>
  )
}

export default Request
