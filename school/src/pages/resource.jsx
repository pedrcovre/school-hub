import { useEffect, useState, useMemo } from 'react'
import DataTable from '../components/DataTable'
import { useSearch } from '../contexts/SearchContext'

const ITEMS_PER_PAGE = 5

const Resource = () => {
  const [resources, setResources] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const { searchTerm } = useSearch()

  useEffect(() => {
    const fetchData = async () => {
      const fakeData = [
        { nome: 'Rafael Gomes', tipo: 'SQL - Modelagem', data: '2025-06-04' },
        { nome: 'Ana Cardoso', tipo: 'POO - Java', data: '2025-06-02' },
        { nome: 'Lucas Souza', tipo: 'Redes', data: '2025-06-01' },
        {
          nome: 'Anderson Vieira',
          tipo: 'Engenharia de Software',
          data: '2025-05-30'
        },
        { nome: 'Sophia Dornelles', tipo: 'Algoritmos', data: '2025-05-28' },
        {
          nome: 'Matheus Trevisan',
          tipo: 'Banco de Dados',
          data: '2025-05-26'
        },
        {
          nome: 'Paulo Alzhaeimer',
          tipo: 'Sistemas Operacionais',
          data: '2025-05-24'
        },
        {
          nome: 'Manete Paraquedas',
          tipo: 'Sistemas Operacionais',
          data: '2025-05-24'
        }
      ]
      await new Promise(resolve => setTimeout(resolve, 500))
      setResources(fakeData)
    }
    fetchData()
  }, [])

  const filteredResources = useMemo(() => {
    return resources.filter(
      resource =>
        resource.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [resources, searchTerm])

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredResources, currentPage])

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE)

  const headers = ['Nome', 'Tipo de Recurso', 'Data', 'Ação']

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-8'>
          <h1 className='text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-0'>
            Meus Recursos
          </h1>
        </div>

        <DataTable
          headers={headers}
          items={currentItems}
          renderRow={(item, index) => (
            <tr key={index} className='hover:bg-gray-50 transition-colors'>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                {item.nome}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {item.tipo}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {item.data}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm'>
                <button className='flex items-center gap-2 text-zinc-600 font-semibold hover:text-zinc-800 hover:cursor-pointer'>
                  <span className='material-symbols-rounded'>download</span>
                  <span>Download</span>
                </button>
              </td>
            </tr>
          )}
        />

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

export default Resource
