import { useState } from 'react'

const NewRequest = () => {
  const [titulo, setTitulo] = useState('')
  const [tipo, setTipo] = useState('')
  const [motivo, setMotivo] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [urgencia, setUrgencia] = useState('')
  const [setArquivo] = useState(null)

  const handleSumbit = e => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div className='mt-7'>
          <label className='block text-2xl font-normal text-black'>
            Título*
          </label>
          <input
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            type='text'
            placeholder='Adicione um Título'
            className='text-zinc-950 text-xl border-1
            border-solid border-black/20 rounded-lg p-3 focus:outline-none block
            w-full'
          />
        </div>
        <div className='mt-7'>
          <label className='block text-2xl font-normal text-black'>Tipo*</label>
          <select
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            placeholder='Selecione'
            className='text-zinc-950 text-xl border-1
            border-solid border-black/20 rounded-lg p-3 focus:outline-none block
            w-full'
          >
            <option value='' disabled hidden>
              Selecione
            </option>
            <option value='equipamento'>Equipamento</option>
            <option value='suporte'>Suporte TI</option>
            <option value='software'>Software</option>
            <option value='treinamento'>Treinamento</option>
          </select>
        </div>
        <div className='mt-7'>
          <label className='block text-2xl font-normal text-black'>
            Motivo*
          </label>
          <textarea
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
            className='text-zinc-950 text-xl border-1
            border-solid border-black/20 rounded-lg p-3 focus:outline-none block
            w-full'
            name='motivo'
            id='motivo'
          ></textarea>
        </div>
        <div className='mt-7'>
          <label className='block text-2xl font-normal text-black'>
            Quantidade
          </label>
          <input
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)}
            type='number'
            placeholder='Digite a quantidade'
            className='items-center justify-center text-zinc-950 text-xl border-1 border-solid border-black/20 rounded-lg p-3 focus:outline-none block w-full'
          />
        </div>
        <div className='mt-7'>
          <label className='block text-2xl font-normal text-black'>
            Urgência*
          </label>
          <select
            value={urgencia}
            onChange={e => setUrgencia(e.target.value)}
            placeholder='Selecione'
            className='text-zinc-950 text-xl border-1
            border-solid border-black/20 rounded-lg p-3 focus:outline-none block
            w-full'
          >
            <option value='' disabled hidden>
              Selecione
            </option>
            <option value='hoje'>Hoje</option>
            <option value='2'>Até 2 dias úteis</option>
            <option value='5'>Até 5 dias úteis</option>
            <option value='10'>Até 10 dias úteis</option>
          </select>
        </div>
        <div className='mt-7'>
          <label className='block text-2xl font-normal text-black'>
            Arquivo
          </label>
          <input
            onChange={e => setArquivo(e.target.value[0])}
            type='file'
            placeholder='Anexe um arquivo'
            className='items-center justify-center text-zinc-950 text-xl border-1 border-solid border-black/20 rounded-lg p-3 focus:outline-none block w-full'
          />
        </div>
      </form>
    </div>
  )
}

export default NewRequest
