import React from 'react'

/* function to return de categories*/
const Category = ({id, title, onCategoryClick}) => {
  return (
    <ul key={id} onClick={() => onCategoryClick(id)}>{title}</ul>
  )
}

export default Category