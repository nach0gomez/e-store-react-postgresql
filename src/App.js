import React, { useState } from 'react';
import './App.css';
import CategoryProduct from './components/categoryProduct';
import { getCategories, getProducts, getAllProducts } from './fetcher';
import { Link } from 'react-router-dom';


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
      <li key={c.id}> <Link to={`/categories/${c.id}`}> {c.title}  </Link> </li>
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
      
    </main>
    </section>
    <footer>
        Todos los derechos reservados
    </footer>
    </>
    );
}

export default App;
