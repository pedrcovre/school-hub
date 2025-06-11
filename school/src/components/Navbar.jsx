import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'

const adminSitemap = [
  { label: 'Requisições', href: '#' },
  { label: 'Recursos', href: '#' },
  { label: 'Dashboard', href: '#' }
]

const studentSitemap = [
  { label: 'Requisições', href: '#' },
  { label: 'Recursos', href: '#' }
]

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  if (!user) return null

  const handleLogout = () => {
    logout()
  }

  const sitemap = user.role === 'admin' ? adminSitemap : studentSitemap
  const avatar =
    user.role === 'admin'
      ? '/src/assets/icon-avatar-admin.png'
      : '/src/assets/icon-avatar-aluno.png'
  const icon =
    user.role === 'admin' ? '/src/assets/logo-admin.png' : '/logo.svg'

  return (
    <header className='top-0 left-0 w-full h-20 z-40 bg-white shadow'>
      <div className='max-w-screen-2xl mx-auto px-5 flex items-center justify-between h-full'>
        <div className='flex items-center gap-5'>
          <a href='/'>
            <img src={icon} className='w-[50px]' alt='School Hub' />
          </a>
          <h1 className='text-3xl font-bold'>
            <a href='#'>School Hub</a>
          </h1>
          <ul className='flex gap-5 text-base ml-5'>
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

          <div className='relative' ref={dropdownRef}>
            <button
              type='button'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={avatar}
                className='w-[50px] rounded-full'
                alt='Avatar'
              />
            </button>

            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                <div className='px-4 py-2 text-sm text-gray-700'>
                  <p className='font-semibold'>{user.name}</p>
                  <p className='text-xs text-gray-500 break-words'>
                    {user.email}
                  </p>
                </div>
                <div className='border-t border-gray-100'></div>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                >
                  Meu Perfil
                </a>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer'
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
