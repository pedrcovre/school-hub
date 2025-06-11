import { Outlet } from 'react-router-dom'
import { Navbar } from './'

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className='p-5'>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
