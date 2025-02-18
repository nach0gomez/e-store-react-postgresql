import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductsById } from '../api/productsApi'
import '../styles/productDetail.css'
import { CartContext } from '../contexts/cartContext'

const ProductDetail = () => {
  const { addProduct } = useContext(CartContext)
  const { productId } = useParams()
  const [product, setProduct] = useState({ errorMessage: '', data: {} })
  const [quantity, setQuantity] = useState(1) // Control de cantidad
  const [selectedSize, setSelectedSize] = useState('M') // Talla por defecto

  useEffect(() => {
    const fetchData = async () => {
      const product = await getProductsById(productId)
      setProduct(product)
    }
    fetchData()
  }, [productId])

  return (
    <div className='product-container-detail'>
      {/* 🔹 Imagen Principal */}
      <div className='product-image-container'>
        <img src={`/assets/${product.image}`} alt={product.title} />
      </div>

      {/* 🔹 Información del Producto */}
      <div className='product-details'>
        <h2>{product.title}</h2>
        <p className='sku'>SKU: {product.sku || '11253201'}</p>
        <p className='description'>{product.description}</p>
        <h3 className='price'>${product.price || '100.00'}</h3>

        {/* 🔹 Selector de Talla */}
        <div className='size-selector'>
          <span>Tamaño:</span>
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              className={selectedSize === size ? 'active' : ''}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* 🔹 Selector de Cantidad */}
        <div className='quantity-selector'>
          <span>Cantidad:</span>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        {/* 🔹 Botones de Acción */}
        <div className='action-buttons'>
          <button
            className='add-to-cart'
            onClick={() => addProduct({ id: product.id, title: product.title, price: product.price, quantity })}
          >
            🛒 Agregar al Carrito
          </button>
          <button className='buy-now'>🔥 Comprar Ahora</button>
        </div>

        <p className='safe-checkout'>✅ Compra Segura y Garantizada</p>
      </div>
    </div>
  )
}

export default ProductDetail
