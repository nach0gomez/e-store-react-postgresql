import React, { useState } from 'react';
import './App.css';
import Category from './components/category';
import CategoryProduct from './components/categoryProduct';
import { getCategories, getProducts, getAllProducts } from './fetcher';

function App() {
  // create an array to store the data from the json request
  const [categories, setCategories] = useState({errorMessage: "", data: []}); 
  const [products, setProducts] = useState({errorMessage: "", data: []}); 


  // we make sure it is called once the page is mounted 
  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);

      //get all the products to be loaded in the app with no category selected
      const responseObjectProduct = await getAllProducts();
      setProducts(responseObjectProduct);
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
    return products.data.map( p => 
      //<Product key={c.id} id={c.id} title={c.id}/>
      <CategoryProduct key={p.id} {...p}>{p.title}</CategoryProduct>);
  }

  return (
    <>
    <header>Mercado Gris</header>

    <section>
      <nav>
        { categories.errorMessage && <div>Error: {categories.errorMessage}</div>}
        { categories.data && renderCategories() }  
      </nav>
    
    <main>
      <h1>Productos</h1>
      { products.errorMessage && <div>Error: {products.errorMessage}</div>} 
      { products && renderProducts()}
    </main>
    </section>
    <footer>
        Todos los derechos reservados
    </footer>
    </>
    );
}

export default App;
