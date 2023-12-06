import React, { useState, useEffect } from 'react';
import './App.css';
import { getCategories } from './fetcher';
import ProductDetail from './components/productDetail';
import Cart from './components/cart';
import Checkout from './components/checkout';
import Category from './components/category';
import Layout from './components/layout';
import { Home } from './components/home';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

function App() {
  const [categories, setCategories] = useState({ errorMessage: '', data: [], });

  useEffect(() => {
    const fetchData = async () => {
      const responseObject1 = await getCategories();
      setCategories(responseObject1);

    };
    fetchData();
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout categories={categories}  />}>
          <Route index element={<Home/>} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="categories/:categoryId/products/:productId" element={<ProductDetail />} />
          <Route path="categories/:categoryId" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  