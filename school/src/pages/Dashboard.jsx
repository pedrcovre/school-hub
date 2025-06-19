
import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const Dashboard = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token, role } = useAuth()

  useEffect(() => {
    const fetchRequestsForDashboard = async () => {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        const response = await axios.get(`${API_URL}/api/requests`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setRequests(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Erro ao buscar requisições para o dashboard:', err)
        setError('Não foi possível carregar os dados do dashboard.')
        setLoading(false)
      }
    }
    fetchRequestsForDashboard()
  }, [token])


  const dashboardData = useMemo(() => {
    const totalRequests = requests.length
    const statusCounts = requests.reduce(
      (acc, req) => {
        const status = req.status?.toLowerCase()
        acc[status] = (acc[status] || 0) + 1
        return acc
      },
      { pending: 0, approved: 0, rejected: 0 }
    )


    const typeCounts = requests.reduce((acc, req) => {
      const type = req.tipo || 'Outro' 
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})


    const urgencyCounts = requests.reduce((acc, req) => {
      const urgency = req.urgency?.toLowerCase() || 'não informada'
      acc[urgency] = (acc[urgency] || 0) + 1
      return acc
    }, {})

    return { totalRequests, statusCounts, typeCounts, urgencyCounts }
  }, [requests])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-xl text-gray-700'>
          Carregando dados do dashboard...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-xl text-red-600'>{error}</p>
      </div>
    )
  }


  if (role !== 'admin') {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-xl text-red-600'>
          Acesso negado. Este dashboard é apenas para administradores.
        </p>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
      <h1 className='text-3xl lg:text-4xl font-bold text-black mb-8'>
        Dashboard de Requisições
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Total de Requisições
          </h2>
          <p className='text-5xl font-bold text-blue-600'>
            {dashboardData.totalRequests}
          </p>
        </div>


        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Requisições por Status
          </h2>
          <div className='space-y-2'>
            <p className='flex justify-between items-center text-lg'>
              <span className='font-medium'>Pendente:</span>
              <span className='px-3 py-1 rounded-full text-md font-semibold bg-gray-100 text-gray-800'>
                {dashboardData.statusCounts.pending}
              </span>
            </p>
            <p className='flex justify-between items-center text-lg'>
              <span className='font-medium'>Aprovado:</span>
              <span className='px-3 py-1 rounded-full text-md font-semibold bg-green-100 text-green-800'>
                {dashboardData.statusCounts.approved}
              </span>
            </p>
            <p className='flex justify-between items-center text-lg'>
              <span className='font-medium'>Recusado:</span>
              <span className='px-3 py-1 rounded-full text-md font-semibold bg-red-100 text-red-800'>
                {dashboardData.statusCounts.rejected}
              </span>
            </p>
          </div>
        </div>


        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Requisições por Tipo
          </h2>
          <div className='space-y-2'>
            {Object.entries(dashboardData.typeCounts).map(([type, count]) => (
              <p
                key={type}
                className='flex justify-between items-center text-lg'
              >
                <span className='font-medium capitalize'>{type}:</span>
                <span className='px-3 py-1 rounded-full text-md font-semibold bg-indigo-100 text-indigo-800'>
                  {count}
                </span>
              </p>
            ))}
          </div>
        </div>


        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Requisições por Urgência
          </h2>
          <div className='space-y-2'>
            {Object.entries(dashboardData.urgencyCounts).map(
              ([urgency, count]) => (
                <p
                  key={urgency}
                  className='flex justify-between items-center text-lg'
                >
                  <span className='font-medium capitalize'>{urgency}:</span>
                  <span className='px-3 py-1 rounded-full text-md font-semibold bg-yellow-100 text-yellow-800'>
                    {count}
                  </span>
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
