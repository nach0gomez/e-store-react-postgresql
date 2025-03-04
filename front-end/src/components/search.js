import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/search.css'

function Search () {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // Function to handle the search logic
  const performSearch = useCallback(() => {
    const trimmedTerm = searchTerm.trim()

    if (trimmedTerm) {
      navigate(`/search?s=${trimmedTerm}`)
    } else if (location.pathname === '/search') {
      navigate('/')
    }
  }, [searchTerm, navigate, location]) // Solo se recrea cuando estas dependencias cambian

  useEffect(() => {
    // Debounce the search term input to avoid rapid navigation
    const delay = setTimeout(performSearch, 500)

    return () => clearTimeout(delay) // Cleanup function to prevent multiple executions
  }, [searchTerm, navigate, location, performSearch])

  // Handles input changes
  const handleChange = (ev) => {
    setSearchTerm(ev.target.value)
  }

  // Handles form submission
  const handleSubmit = (ev) => {
    ev.preventDefault()
    performSearch()
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
