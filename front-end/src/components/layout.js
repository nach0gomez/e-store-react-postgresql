import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../styles/layout.css'
import { HomeIcon, ShoppingCartIcon } from './icons'
import Search from './search'

// icons
import UseAnimations from 'react-useanimations'
import menu2 from 'react-useanimations/lib/menu2'

const Layout = ({ categories }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <aside>
      {/* Header */}
      <header className='header'>
        {/* Toggle button (only visible on small screens) */}
        <button className='toggle-sidebar' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <UseAnimations animation={menu2} speed={2} strokeColor='white' />
        </button>

        {/* Home Icon */}
        <div className='header-icon'>
          <Link to='/'>
            <HomeIcon width={40} />
          </Link>
        </div>

        {/* App Title */}
        <div className='header-title'>Shopper</div>

        {/* Search Bar */}
        <div className='header-search'>
          <Search />
        </div>

        {/* Placeholder Features */}
        <div className='header-extras'>
          <span className='header-feature'>🔔</span> {/* Notifications */}
          <span className='header-feature'>👤</span> {/* User Profile */}
        </div>

        {/* Cart Icon */}
        <div className='header-icon'>
          <Link to='/cart'>
            <ShoppingCartIcon width={40} />
          </Link>
        </div>
      </header>
      {/* Sidebar (Always visible on desktops) */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2>Categories</h2>
        <ul>
          {categories.map((c) => (
            <li key={c.id_category} className='categories'>
              <Link to={`/categories/${c.id}`}>{c.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <section>
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
