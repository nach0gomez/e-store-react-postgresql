import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../styles/layout.css'
import { HomeIcon, ShoppingCartIcon } from './icons'
import Search from './search'

const Layout = ({ categories }) => {
  // render the categories, this is done when the page loads for first time
  const renderCategories = () => {
    return categories.map(c =>
      <li className='categories' key={c.id_category}> <Link to={`/categories/${c.id}`}> {c.title}  </Link> </li>
    )
  }

  return (
    <>
      <header>
        <div id='headerHomeIcon'>
          <Link to='/'><HomeIcon width={40} /></Link>
        </div>

        <Search />

        <div id='headerTitle'>Shopper</div>
        <div id='headerCartIcon'>
          <Link to='/cart'><ShoppingCartIcon width={40} /> </Link>
        </div>
      </header>

      <section>
        <nav>
          Categories
          <ul>
            {categories && renderCategories()}
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
    </>
  )
}

export default Layout
