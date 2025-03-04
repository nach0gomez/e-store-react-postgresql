import { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductsById } from '../api/productsApi'
import '../styles/productDetail.css'
import { CartContext } from '../contexts/cartContext'

const ProductDetail = () => {
  const { addProduct } = useContext(CartContext)
  const { productId } = useParams()
  const [product, setProduct] = useState({ errorMessage: '', data: {} })
  const [quantity, setQuantity] = useState(1) // Control de cantidad
  const [selectedSize, setSelectedSize] = useState('M') // Talla por defecto
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const product = await getProductsById(productId)
      product.features = product.features.split(',')
      product.description = product.description.split('\\n\\n')
      setProduct(product)
    }
    fetchData()
  }, [productId])

  return (
    <div className='product-container-detail'>
      {/* 🔹 Main image */}
      <div className='product-image-container'>
        <img src={`/assets/${product.image}`} alt={product.title} />
        <h3 className='features'>Features</h3>
        <ul>
          {product.features && product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* 🔹 Product information */}
      <div className='product-details'>
        <h2>{product.title}</h2>
        <p className='sku'>SKU: {product.sku || '11253201'}</p>
        <ul className='description'>
          {product.description && product.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h3 className='price'>${product.price || '100.00'}</h3>

        {/* 🔹 Size Selector */}
        <div className='size-selector'>
          <span>Size:</span>
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

        {/* 🔹 Quantity selector */}
        <div className='quantity-selector'>
          <span>Quantity:</span>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        {/* 🔹 Action buttons */}
        <div className='action-buttons'>
          <button
            className='add-to-cart'
            onClick={() => addProduct({ id: product.id_product, title: product.title, price: product.price, quantity })}
          >
            🛒 Add to Cart
          </button>
          <button
            className='buy-now'
            onClick={() => {
              addProduct({ id: product.id_product, title: product.title, price: product.price, quantity })
              Navigate('/cart')
            }}
          >
            🔥 Buy Now
          </button>
        </div>

        <p className='safe-checkout'>✅ Guaranteed safe checkout</p>
      </div>
    </div>
  )
}

export default ProductDetail
