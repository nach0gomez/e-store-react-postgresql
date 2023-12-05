import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import '../styles/layout.css';


const Layout = ({categories}) => {

    //render the categories, this is done when the page loads for first time
  const renderCategories = () => {
    return categories.data.map( c => 
      <li className='categories' key={c.id}> <Link to={`/categories/${c.id}`}> {c.title}  </Link> </li>
      );
  }

    return (
    <>
    <header>Mercado Gris</header>

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