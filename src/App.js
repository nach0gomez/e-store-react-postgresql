import React, { useState } from 'react';
import './App.css';
import Category from './components/Category';
import { getCategories, getProducts } from './fetcher';

function App() {
  // create an array to store the data from the json request
  const [categories, setCategories] = useState({errorMessage: "", data: []}); 
  const [products, setProducts] = useState({errorMessage: "", data: []}); 


  // we make sure it is called once the page is mounted 
  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    }
    fetchData();
  }, [])

  // create the event when a category is clicked
  const handleCategoryClick = id => {
    const fetchData = async () => {
      const responseObject = await getProducts(id);
      setProducts(responseObject);
    }
    fetchData();
  }
  
  //render the categories, this is done when the page loads for first time
  const renderCategories = () => {
    return categories.data.map( c => 
        <Category key={c.id} id={c.id} title={c.title} onCategoryClick={() => handleCategoryClick(c.id)}/>
      );
  }

  //render the products when a category is clicked, depending on the catId
  const renderProducts = () => {
    return products.data.map( c => 
      //<Product key={c.id} id={c.id} title={c.id}/>
      <div>{c.title}</div>
      )
  }

  return (
    <>
    <header>Mercado Gris</header>

    <section>
      <nav>
        { categories.errorMessage && <div>Error: {categories.errorMessage}</div>}
        { categories.data && renderCategories() }  
      </nav>
    
    <article>
      <h1>Productos</h1>
      { products.errorMessage && <div>Error: {products.errorMessage}</div>} 
      { products && renderProducts()}
    </article>
    </section>
    <footer>
        Todos los derechos reservados
    </footer>
    </>
    );
}

export default App;
