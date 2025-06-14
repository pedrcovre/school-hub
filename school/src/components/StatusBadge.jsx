const StatusBadge = ({ status }) => {
  const statusStyles = {
    Aprovado: 'bg-green-100 text-green-800',
    Recusado: 'bg-red-100 text-red-800',
    Pendente: 'bg-zinc-300 text-zinc-600'
  }

  const style = statusStyles[status] || 'bg-white text-amber-500'

  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-lg ${style}`}>
      {status}
    </span>
  )
}

export default StatusBadge
