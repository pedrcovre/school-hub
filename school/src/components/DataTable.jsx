const DataTable = ({ headers, items, renderRow }) => {
  return (
    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className='px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {items.map((item, index) => renderRow(item, index))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
