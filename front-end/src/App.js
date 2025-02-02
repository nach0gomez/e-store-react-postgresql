import React, { useState, useEffect } from 'react'
import './App.css'
import { getCategories } from './api/categoriesApi'
import ProductDetail from './components/productDetail'
import Cart from './components/cart'
import Checkout from './components/checkout'
import Category from './components/category'
import Layout from './components/layout'
import Home from './components/home'
import OrderConfirmation from './components/orderConfirmation'
import SearchResults from './components/searchResult'

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

function App () {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories()

        if (categories.length > 0) {
          setCategories(categories)
        }
      } catch (error) {
        setCategories({ errorMessage: 'Error al obtener categorías', data: [] })
      }
    }

    fetchData()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout categories={categories} />}>
          <Route index element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='orderconfirmation' element={<OrderConfirmation />} />
          <Route path='search' element={<SearchResults />} />
          <Route path='categories/:categoryId/products/:productId' element={<ProductDetail />} />
          <Route path='products/:productId' element={<ProductDetail />} />
          <Route path='categories/:categoryId' element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
