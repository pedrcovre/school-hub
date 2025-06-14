import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSearch } from '../contexts/SearchContext' 
import StatusBadge from '../components/StatusBadge'

const ITEMS_PER_PAGE = 5
const TABS = ['Todos', 'Aberta', 'Fechado']

const Request = () => {
  const [Requests, setRequests] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTab, setSelectedTab] = useState(TABS[0])
  const { role } = useAuth()
  const navigate = useNavigate()
  const { searchTerm } = useSearch() 

  useEffect(() => {
    const fetchData = async () => {
      const fakeData = [
        {
          id: 'REQ-2025-001',
          tipo: 'SQL - Modelagem',
          data: '2025-06-04',
          status: 'Aprovado',
          responsavel: 'Matheus Kilpp'
        },
        {
          id: 'REQ-2025-002',
          tipo: 'SQL - Modelagem',
          data: '2025-06-04',
          status: 'Recusado',
          responsavel: 'Matheus Kilpp'
        },
        {
          id: 'REQ-2025-003',
          tipo: 'SQL - Modelagem',
          data: '2025-06-04',
          status: 'Pendente',
          responsavel: 'Matheus Kilpp'
        },
        {
          id: 'REQ-2025-004',
          tipo: 'Python - Introdução',
          data: '2025-06-01',
          status: 'Pendente',
          responsavel: 'Matheus Kilpp'
        },
        {
          id: 'REQ-2025-005',
          tipo: 'JavaScript - Avançado',
          data: '2025-06-02',
          status: 'Aprovado',
          responsavel: 'Matheus Kilpp'
        },
        {
          id: 'REQ-2025-006',
          tipo: 'HTML - Básico',
          data: '2025-06-03',
          status: 'Recusado',
          responsavel: 'Matheus Kilpp'
        }
      ]
      await new Promise(resolve => setTimeout(resolve, 500))
      setRequests(fakeData)
    }
    fetchData()
  }, [])

  const filteredRequests = useMemo(() => {
    let filteredByTab = Requests
    if (selectedTab === 'Aberta') {
      filteredByTab = Requests.filter(r => r.status === 'Pendente')
    } else if (selectedTab === 'Fechado') {
      filteredByTab = Requests.filter(
        r => r.status === 'Aprovado' || r.status === 'Recusado'
      )
    }

    if (!searchTerm) {
      return filteredByTab
    }

    return filteredByTab.filter(
      request =>
        request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.responsavel.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [Requests, selectedTab, searchTerm])

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

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-8'>
          <h1 className='text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-0'>
            Minhas Requisições
          </h1>
          {role !== 'admin' && (
            <button
              className='bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:bg-blue-600 transition-colors'
              onClick={() => navigate('/newrequest')}
            >
              Nova Requisição
            </button>
          )}
        </div>

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

        <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider'>
                    ID
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider'>
                    Tipo de Recurso
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
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                      {item.id}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {item.tipo}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {item.data}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <StatusBadge status={item.status} />
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {item.responsavel}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-600 hover:underline cursor-pointer'>
                      {actionText}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
    </div>
  )
}

export default Request
