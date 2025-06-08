const sitemap = [
  { label: 'Requisições', href: '#' },
  { label: 'Recursos', href: '#' }
]

const Navbar = () => {
  return (
    <header className='top-0 left-0 w-full h-20 z-40 bg-white shadow'>
      <div className='max-w-screen-2xl mx-auto px-5 flex items-center justify-between h-full'>
        <div className='flex items-center gap-5'>
          <a href='/'>
            <img
              src='/logo.svg'
              className='w-[50px]'
              alt='School Hub'
            />
          </a>
          <h1 className='text-3xl font-bold'>
            <a href='#'>School Hub</a>
          </h1>
          <ul className='flex gap-5 text-base  ml-5'>
            {sitemap.map(({ label, href }, key) => (
              <li key={key}>
                <a href={href} className='hover:text-zinc-600 transition'>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex items-center gap-6'>
          <form className='flex items-center bg-[#395F8B1A] rounded-lg px-3 w-[263px] h-[50px]'>
            <img
              src='src/assets/search.svg'
              alt='search'
              className='w-[25px]'
            />
            <input
              type='text'
              placeholder='Buscar'
              className='ml-3 w-full bg-transparent text-zinc-950 text-base focus:outline-none'
            />
          </form>
          <button
            type='button'
            className='flex items-center justify-center bg-[#395F8B1A] rounded-lg px-3 w-[50px] h-[50px]'
          >
            <span className='material-symbols-rounded text-zinc-950'>
              notifications
            </span>
          </button>
          <button type='button'>
            <img
              src='src/assets/icon-avatar-aluno.png'
              className='w-[50px]'
              alt='Avatar'
            />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
