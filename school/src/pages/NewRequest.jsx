import { useState } from 'react'

const NewRequest = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: '',
    motivo: '',
    quantidade: '',
    urgencia: '',
    arquivo: null
  })

  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    setFormData(prev => ({ ...prev, arquivo: file }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'O título é obrigatório'
    }

    if (!formData.tipo) {
      newErrors.tipo = 'Selecione um tipo'
    }

    if (!formData.motivo.trim()) {
      newErrors.motivo = 'O motivo é obrigatório'
    }

    if (formData.quantidade) {
      const numero = Number(formData.quantidade)
      if (isNaN(numero)) {
        newErrors.quantidade = 'Digite um número válido'
      } else if (numero <= 0) {
        newErrors.quantidade = 'O valor deve ser maior que zero'
      } else if (!Number.isInteger(numero)) {
        newErrors.quantidade = 'A quantidade deve ser um número inteiro'
      }
    }

    if (!formData.urgencia) {
      newErrors.urgencia = 'Selecione a urgência'
    }

    if (formData.arquivo) {
      const file = formData.arquivo
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
      const maxSize = 5 * 1024 * 1024

      if (!allowedTypes.includes(file.type)) {
        newErrors.arquivo = 'Tipo de arquivo inválido. Use PDF, JPG ou PNG.'
      } else if (file.size > maxSize) {
        newErrors.arquivo = 'Arquivo muito grande. Máximo: 5MB.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      console.log('Dados enviados:', formData)
    } else {
      console.log('Formulário com erros')
    }
  }

  return (
    <div className='flex justify-center items-start h-screen p-10 pt-6 overflow-hidden'>
      <div className='flex w-full max-w-7xl gap-10 justify-center'>
        <div className='max-w-xl p-0 space-y-4 flex-1'>
          <h1 className='text-4xl font-semibold'>Nova Requisição</h1>
          <p className='text-nowrap text-black/50'>
            Por favor preencha os dados abaixo para resolvermos seu problema.
          </p>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='mb-1'>
              <label className='block text-zinc-950 text-xl mb-1 font-semibold'>
                Título
              </label>
              <input
                name='titulo'
                value={formData.titulo}
                onChange={handleChange}
                placeholder='Digite o título'
                className='text-zinc-950 text-xl border border-black/20 rounded-lg p-3 focus:outline-none block w-full'
              />
              {errors.titulo && (
                <p className='text-red-500 text-sm'>{errors.titulo}</p>
              )}
            </div>

            <div className='mb-1'>
              <label className='block text-zinc-950 text-xl mb-1 font-semibold'>
                Tipo da requisição
              </label>
              <select
                name='tipo'
                value={formData.tipo}
                onChange={handleChange}
                className='text-zinc-950 text-xl border border-black/20 rounded-lg p-3 focus:outline-none block w-full bg-white'
              >
                <option value='' disabled className='text-zinc-950'>
                  Selecione o tipo
                </option>
                <option value='equipamento'>Equipamento</option>
                <option value='suporte'>Suporte TI</option>
                <option value='software'>Software</option>
                <option value='treinamento'>Treinamento</option>
              </select>
              {errors.tipo && (
                <p className='text-red-500 text-sm'>{errors.tipo}</p>
              )}
            </div>

            <div className='mb-1'>
              <label className='block text-zinc-950 text-xl mb-1 font-semibold'>
                Motivo
              </label>
              <textarea
                name='motivo'
                value={formData.motivo}
                onChange={handleChange}
                placeholder='Descreva o motivo da requisição'
                className='text-zinc-950 text-xl border border-black/20 rounded-lg p-3 focus:outline-none block w-full'
              />
              {errors.motivo && (
                <p className='text-red-500 text-sm'>{errors.motivo}</p>
              )}
            </div>

            <div className='mb-1'>
              <label className='block text-zinc-950 text-xl mb-1 font-semibold'>
                Quantidade
              </label>
              <input
                name='quantidade'
                type='number'
                value={formData.quantidade}
                onChange={handleChange}
                placeholder='Digite a quantidade'
                min='1'
                step='1'
                className='text-zinc-950 text-xl border border-black/20 rounded-lg p-3 focus:outline-none block w-full'
              />
              {errors.quantidade && (
                <p className='text-red-500 text-sm'>{errors.quantidade}</p>
              )}
            </div>

            <div className='mb-1'>
              <label className='block text-zinc-950 text-xl mb-1 font-semibold'>
                Urgência
              </label>
              <select
                name='urgencia'
                value={formData.urgencia}
                onChange={handleChange}
                className='text-zinc-950 text-xl border border-black/20 rounded-lg p-3 focus:outline-none block w-full bg-white'
              >
                <option value='' disabled className='text-zinc-950'>
                  Selecione a urgência
                </option>
                <option value='hoje'>Hoje</option>
                <option value='2'>Até 2 dias úteis</option>
                <option value='5'>Até 5 dias úteis</option>
                <option value='10'>Até 10 dias úteis</option>
              </select>
              {errors.urgencia && (
                <p className='text-red-500 text-sm'>{errors.urgencia}</p>
              )}
            </div>

            <div className='mb-1'>
              <label className='block text-zinc-950 text-xl mb-1 font-semibold'>
                Anexo
              </label>
              <label
                htmlFor='arquivo'
                className='cursor-pointer text-zinc-950 text-xl border border-black/20 rounded-lg p-3 flex items-center justify-between bg-white hover:bg-gray-100 transition-colors select-none'
              >
                Faça um upload
                <span className='material-symbols-outlined text-3xl text-zinc-950'>
                  upload_file
                </span>
              </label>
              <input
                id='arquivo'
                name='arquivo'
                type='file'
                onChange={handleFileChange}
                className='hidden'
              />
              {errors.arquivo && (
                <p className='text-red-500 text-sm mt-1'>{errors.arquivo}</p>
              )}
              {formData.arquivo && (
                <p className='mt-1 text-sm text-gray-700'>
                  Arquivo: {formData.arquivo.name}
                </p>
              )}
            </div>

            <button
              type='submit'
              className='cursor-pointer text-white text-xl rounded-lg p-3 focus:outline-none block w-full bg-blue-400 mt-8'
            >
              Enviar
            </button>
          </form>
        </div>
        <div className='flex-1 flex justify-center'>
          <img
            src='./src/assets/image-request.png'
            alt='Requisição'
            className='h-[800px] object-contain'
          />
        </div>
      </div>
    </div>
  )
}

export default NewRequest
