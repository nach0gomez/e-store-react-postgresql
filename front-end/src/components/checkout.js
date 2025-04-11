import React, { useContext } from 'react'
import '../styles/checkout.css'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../contexts/cartContext'
import axios from 'axios'

const Checkout = () => {
  const [form, setForm] = React.useState({
    fullName: '',
    document: '',
    email: '',
    phone: '',
    address: '',
    shippingAddress: '',
    copyAddress: false
  })

  const { getItems, clearCart } = useContext(CartContext)
  const navigate = useNavigate()
  const cartItems = getItems()

  const renderTotal = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target
    setForm((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleCopyAddress = () => {
    if (form.copyAddress) {
      setForm((prevState) => ({
        ...prevState,
        shippingAddress: prevState.address
      }))
    }
  }

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidNumber = (number) => /^[0-9]+$/.test(number)

  const handleSubmit = async () => {
    try {
      if (!isValidEmail(form.email)) return alert('Invalid email address')
      if (!isValidNumber(form.document)) return alert('Invalid document number')
      if (!isValidNumber(form.phone)) return alert('Invalid phone number')

      const data = { ...form, totalValue: renderTotal() }

      const response = await axios.post('http://localhost:3004/save', data)

      if (response.status === 200) {
        clearCart()
        setForm({
          fullName: '',
          document: '',
          email: '',
          phone: '',
          address: '',
          shippingAddress: '',
          copyAddress: false
        })
        navigate('/orderconfirmation')
      } else {
        console.error('Error saving data:', response.statusText)
      }
    } catch (error) {
      console.error('Error:', error.message || error.response?.data || 'Unknown error')
    }
  }

  return (
    <div className='checkout-container'>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className='checkout-title'>Checkout Form</h2>

        <div className='checkout-grid'>
          {/* Left Section - Personal Info */}
          <div className='checkout-column'>
            <h3>Personal Information</h3>
            <div className='form-group'>
              <label htmlFor='fullName'>Full Name</label>
              <input type='text' name='fullName' placeholder='Enter Full Name' required onChange={handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor='document'>Document Number</label>
              <input type='text' name='document' placeholder='Enter Document Number' required onChange={handleChange} />
            </div>

            <h3>Residential Information</h3>
            <div className='form-group'>
              <label htmlFor='copy'>Copy address to shipping</label>
              <input type='checkbox' name='copyAddress' checked={form.copyAddress} onChange={handleChange} onClick={handleCopyAddress} />
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Full Residential Address</label>
              <input type='text' name='address' placeholder='Enter Address' required onChange={handleChange} onBlur={handleCopyAddress} />
            </div>

            <button className='button cancel-button' onClick={() => navigate('/cart')}>Cancel</button>
          </div>

          {/* Right Section - Contact & Shipping */}
          <div className='checkout-column'>
            <h3>Contact Information</h3>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' placeholder='Enter Email' required onChange={handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Phone</label>
              <input type='text' name='phone' placeholder='Enter Phone' required onChange={handleChange} />
            </div>

            <h3>Shipping Information</h3>
            <div className='form-group'>
              <label htmlFor='shippingAddress'>Full Shipping Address</label>
              <input type='text' name='shippingAddress' placeholder='Enter Shipping Address' required value={form.shippingAddress} onChange={handleChange} />
            </div>

            <button className='button confirm-button' onClick={handleSubmit}>Confirm Order</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
