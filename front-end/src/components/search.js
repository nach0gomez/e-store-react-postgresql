import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/search.css'

function Search () {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!searchTerm.trim()) return

    const delay = setTimeout(() => {
      navigate('/search?s=' + searchTerm.trim())
    }, 500)

    return () => clearTimeout(delay)
  }, [searchTerm, navigate])

  const handleChange = (ev) => {
    setSearchTerm(ev.target.value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (searchTerm.trim()) {
      navigate('/search?s=' + searchTerm.trim())
    }
  }

  return (
    <form id='search' onSubmit={handleSubmit}>
      <input
        type='text'
        name='search'
        placeholder='Search products...'
        value={searchTerm}
        onChange={handleChange}
      />
      <button type='submit'>🔍</button>
    </form>
  )
}

export default Search
