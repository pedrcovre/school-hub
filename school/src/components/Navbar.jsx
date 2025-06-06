const sitemap = [
  { label: 'Requisições', href: '#' },
  { label: 'Recursos', href: '#' }
]

const Header = () => {
  return (
    <header className='top-0 left-0 w-full h-20 z-40 bg-white shadow'>
      <div className='max-w-screen-2xl mx-auto px-5 flex items-center justify-between h-full'>
        <div className='flex items-center gap-5'>
          <a href='/'>
            <img src='/logo.svg' width={50} height={50} alt='School Hub' />
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
            <img src='/search.svg' alt='search' width={25} height={25} />
            <input
              type='text'
              placeholder='Buscar'
              className='ml-3 w-full bg-transparent text-zinc-950 text-base focus:outline-none'
            />
          </form>
          <button type="submit" className='flex items-center justify-center bg-[#395F8B1A] rounded-lg px-3 w-[50px] h-[50px]'>
            <span className='material-symbols-rounded text-zinc-950'>
              notifications
            </span>
          </button>
          <button type="submit">
          <img src='/icon-avatar-aluno.png' width={50} alt='Avatar' />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
