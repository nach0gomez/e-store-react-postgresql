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
    shippingAddress: ''
  })

  const initialState = {
    fullName: '',
    document: '',
    email: '',
    phone: '',
    address: '',
    shippingAddress: '',
    copyAddress: false
  }

  const { getItems, clearCart } = useContext(CartContext)

  const cartItems = getItems()

  const renderTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    return total
  }

  const navigate = useNavigate()

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target

    setForm((prevState) => {
      return {
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  const handleCopyAddress = () => {
    if (form.copyAddress) {
      setForm((prevState) => {
        return {
          ...prevState,
          shippingAddress: prevState.address
        }
      })
    }
  }

  const isValidEmail = (email) => {
    // Regular expression to validate an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidNumber = (number) => {
    // Regular expression to validate a number (digits only)
    const numberRegex = /^[0-9]+$/
    return numberRegex.test(number)
  }

  // Request to SQLite database
  const handleSubmit = async () => {
    try {
      // Validate data before submitting the request
      if (!isValidEmail(form.email)) {
        alert('Invalid email address')
        console.log('Invalid email address')
        return
      }

      if (!isValidNumber(form.document)) {
        alert('Invalid document number')
        console.error('Invalid document number')
        return
      }

      if (!isValidNumber(form.phone)) {
        alert('Invalid phone number')
        console.error('Invalid phone number')
        return
      }

      const data = {
        fullName: form.fullName,
        document: form.document,
        email: form.email,
        phone: form.phone,
        address: form.address,
        shippingAddress: form.shippingAddress,
        totalValue: renderTotal()
      }

      console.log(data)

      // Send a POST request to save the data in the database
      const response = await axios.post('http://localhost:3004/save', data)

      if (response.status === 200) {
        console.log('Data successfully saved')

        // Clear the cart so the items are empty
        clearCart()

        // After submitting the form, reset the form state to initial values
        setForm(initialState)

        navigate('/orderconfirmation') // Redirect to the confirmation page
      } else {
        console.error('Error saving data:', response.statusText)
      }
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.error('Response error:', error.response.data)
        console.error('Status code:', error.response.status)
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error:', error.request)
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error:', error.message)
      }
    }
  }

  // TODO: Change to display grid so I can use grid-template-columns or change smth to easier align the form and responsiveness
  return (
    <div className='checkout'>
      <form onSubmit={handleSubmit}>
        <h2 id='title'>Checkout Form</h2>
        <div className='container'>
          <div className='column' id='left-column'>
            <h4>Personal Information</h4>
            <hr className='hrcheckout' />
            <div className='form-group'>
              <label className='left-label' htmlFor='fullName'>
                Full Name
              </label>
              <input
                type='text'
                id='fullName'
                name='fullName'
                onChange={handleChange}
                placeholder='Enter Full Name *'
                required
              />
            </div>
            <div className='form-group'>
              <label className='left-label' htmlFor='document'>
                Document Number
              </label>
              <input
                type='tel'
                id='document'
                name='document'
                onChange={handleChange}
                placeholder='Enter Document *'
                required
              />
            </div>
            <h4>Residential Information</h4>
            <hr className='hrcheckout' />
            <div className='form-group'>
              <label htmlFor='copy'>Copy address to shipping</label>
              <input
                type='checkbox'
                id='copy'
                name='copyAddress'
                checked={form.copyAddress}
                onChange={handleChange}
                onClick={handleCopyAddress}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Full Residential Address</label>
              <input
                type='text'
                id='address'
                name='address'
                placeholder='Enter Address *'
                required
                onChange={handleChange}
                onBlur={handleCopyAddress}
              />
            </div>
            <button className='cancel-button checkout' onClick={() => navigate('/cart')}>
              Cancel
            </button>
          </div>

          <div className='column' id='right-column'>
            <div className='hr-right'>
              <hr />
            </div>
            <div className='form-group' id='first-item'>
              <label id='email-label' htmlFor='email'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                onChange={handleChange}
                placeholder='Enter Email *'
                required
              />
            </div>
            <div className='form-group'>
              <label id='phone-label' htmlFor='phone'>
                Phone
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                onChange={handleChange}
                placeholder='Enter Phone *'
                required
              />
            </div>
            <div className='hr-right'>
              <hr />
            </div>
            <div className='form-group shipping-address'>
              <label htmlFor='shipping-address'>Full Shipping Address</label>
              <input
                type='text'
                id='shipping-address'
                name='shippingAddress'
                onChange={handleChange}
                placeholder='Enter Address *'
                required
                value={form.shippingAddress}
              />
            </div>
            <div>
              <button className='confirm-button' onClick={handleSubmit} type='button'>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
