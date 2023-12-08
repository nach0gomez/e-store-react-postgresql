import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import '../styles/layout.css';
import { HomeIcon,  ShoppingCartIcon } from './icons';
import Search from './search';

const Layout = ({categories}) => {

    //render the categories, this is done when the page loads for first time
  const renderCategories = () => {
    return categories.data.map( c => 
      <li className='categories' key={c.id}> <Link to={`/categories/${c.id}`}> {c.title}  </Link> </li>
      );
  }

    return (
    <>
    <header>
      <div id='headerHomeIcon'>
        <Link to={'/'}><HomeIcon width={40} /></Link>
      </div>

      <Search />

      <div id='headerTitle'>Mercado Gris</div>
      <div id='headerCartIcon'>
        <Link to={`/cart`}><ShoppingCartIcon width={40} /> </Link>
      </div>
    </header>

    <section>
      <nav>
        { categories.errorMessage && <div>Error: {categories.errorMessage}</div>}
        <ul>
        { categories.data && renderCategories() }    
        </ul>
        </nav>
    
    <main>
      <Outlet />
    </main>
    </section>
    <footer>
        <Link to={"/"}>Inicio</Link> | <Link to={"/cart"}>Carrito</Link>
        <br></br>
        <b>Todos los derechos reservados</b>
    </footer>
    </>
  )
}

export default Layout