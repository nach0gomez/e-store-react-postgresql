import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../styles/layout.css'
import { HomeIcon, ShoppingCartIcon } from './icons'
import Search from './search'

const Layout = ({ categories }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <aside>
      <header>
        <div id='headerHomeIcon'>
          <Link to='/'><HomeIcon width={40} /></Link>
        </div>
        <Search />
        <div id='headerTitle'>Shopper</div>
        <div id='headerCartIcon'>
          <Link to='/cart'><ShoppingCartIcon width={40} /></Link>
        </div>
      </header>

      {/* Botón para abrir/cerrar la barra lateral */}
      <button className='toggle-sidebar' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰
      </button>

      <section>
        {/* Sidebar colapsable */}
        <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <h2>Categories</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.id_category} className='categories'>
                <Link to={`/categories/${c.id}`}>
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main>
          <Outlet />
        </main>
      </section>

      <footer>
        <Link to='/'>Home</Link> | <Link to='/cart'>Cart</Link>
        <br />
        <p>All rights reserved</p>
      </footer>
    </aside>
  )
}

export default Layout
