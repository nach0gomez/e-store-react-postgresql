import React from 'react'
import { useNavigate } from 'react-router-dom';

function Search() {

    const [searchTerm, setSearchTerm] = React.useState('');

    const navigate = useNavigate();
    
  React.useEffect( () => {
    const delay = setTimeout(() => {
      if( searchTerm ) {
        navigate('/search?s='+ searchTerm)
      } 
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm, navigate]);

    const handleChange = ev => {
      setSearchTerm(ev.target.value);

    }
  return (
    <div id='search'>
        <label>Buscar</label>
        <input type='text' name='search' onChange={ handleChange } />
    </div>
  )
}

export default Search