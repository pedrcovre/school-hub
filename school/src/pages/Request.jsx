import { useEffect, useState } from 'react'

const itemsPerPage = 5

const Resource = () => {
  const [resources, setResources] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTab, setSelectedTab] = useState("Todos")

  useEffect(() => {
    const fetchData = async () => {
      const fakeData = [
        {
          id: 'REQ-2025-001',
          tipo: 'SQL - Modelagem',
          data: '2025-06-04',
          Status: 'Aprovado',
          Responsavel: 'Matheus Kilpp'
        },
        {
          id: 'REQ-2025-002',
          tipo: 'SQL - Modelagem',
          data: '2025-06-04',
          Status: 'Recusado',
          Responsavel: 'Matheus Kilpp'
        },
        {
          id: 'REQ-2025-003',
          tipo: 'SQL - Modelagem',
          data: '2025-06-04',
          Status: 'Pendente',
          Responsavel: 'Matheus Kilpp'
        },
        {
          id: 'REQ-2025-004',
          tipo: 'Python - Introdução',
          data: '2025-06-01',
          Status: 'Pendente',
          Responsavel: 'Matheus Kilpp'
        },
        {
          id: 'REQ-2025-005',
          tipo: 'JavaScript - Avançado',
          data: '2025-06-02',
          Status: 'Aprovado',
          Responsavel: 'Matheus Kilpp'
        },
        {
          id: 'REQ-2025-006',
          tipo: 'HTML - Básico',
          data: '2025-06-03',
          Status: 'Recusado',
          Responsavel: 'Matheus Kilpp'
        },
      ]

      await new Promise(resolve => setTimeout(resolve, 500))
      setResources(fakeData)
    }

    fetchData()
  }, [])

  const filteredResources = resources.filter(resource => {
    if (selectedTab === "Aberta") return resource.Status === "Pendente"
    if (selectedTab === "Fechado") return resource.Status === "Aprovado" || resource.Status === "Recusado"
    return true
  })

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filteredResources.slice(startIndex, startIndex + itemsPerPage)

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }

  return (
    <>
      <div className='min-h-screen p-10'>
        <div className='flex justify-between mx-[28%] items-center mb-15'>
        <h1 className='text-[32px] lg:text-[40px] font-medium mb-6 '>
          Minhas Requisições
        </h1>
        <button className='bg-[#5CA4F5] text-white px-10 rounded-xl h-12'>
            Nova Requisição
        </button>
        </div>

        <div className='border-b mx-[27%] flex flex-row gap-15 mb-10 text-[#395F8B]/30 font-semibold'>
          {["Todos", "Aberta", "Fechado"].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setSelectedTab(tab)
                setCurrentPage(1)
              }}
              className={`mb-0.5 ml-[2%] hover:border-b-4 px-4 hover:text-black cursor-pointer ${
                selectedTab === tab ? "border-b-4 text-black" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className='w-1/2 mx-auto rounded-2xl border border-gray-200'>
          <table className='min-w-full bg-white shadow-md rounded-xl'>
            <thead>
              <tr className='text-black border-b text-center border-gray-200 flex justify-around items-center'>
                <th className='py-4 w-40'>ID Requisição</th>
                <th className='py-4 w-40'>Tipo de Recurso</th>
                <th className='py-4 w-40'>Data</th>
                <th className='py-4 w-40'>Status</th>
                <th className='py-4 w-40'>Responsável</th>
                <th className='py-4 w-40'>Ação</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={index}
                  className='hover:bg-gray-50 border-b text-center border-gray-200 flex justify-around items-center'
                >
                  <td className='py-4 w-40'>{item.id}</td>
                  <td className='py-4 w-40'>{item.tipo}</td>
                  <td className='py-4 w-40'>{item.data}</td>
                  <td className='py-4 w-40'>
                    <div className='p-2 rounded-xl bg-gray-200 font-medium'>
                      {item.Status}
                    </div>
                  </td>
                  <td className='py-4 w-40'>{item.Responsavel}</td>
                  <td className='py-4 w-40 cursor-pointer'>Ver</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex justify-center items-center mt-6 gap-4'>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className='flex px-2 items-center py-2 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50'
          >
            <span className='material-symbols-outlined'>arrow_back</span>
          </button>
          <span className='text-base font-medium'>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className='flex px-2 items-center py-2 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50'
          >
            <span className='material-symbols-outlined'>arrow_forward</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Resource
