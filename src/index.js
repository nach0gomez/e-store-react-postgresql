import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProductDetail from './components/productDetail';
import Cart from './components/cart';
import Checkout from './components/checkout';

import {
  BrowserRouter,
  Route,
  Routes,
  } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path='cart' element={<Cart />}/>
      <Route path='checkout' element={<Checkout />}/>
      <Route path='products/:productId' element={<ProductDetail />}/>
    </Routes>
      
    </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
