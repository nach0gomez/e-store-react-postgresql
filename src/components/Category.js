import React from 'react'

/* function to return de categories*/
const Category = ({id, title, onCategoryClick}) => {
  return (
    <div key={id} onClick={() => onCategoryClick(id)}>{title}</div>
  )
}

export default Category