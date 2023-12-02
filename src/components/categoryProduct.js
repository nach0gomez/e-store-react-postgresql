import React from 'react'



//link to navigate to an specific id depending on the element
// useNavigate to force the navigation when loading info from an specific element
import { Link, useNavigate } from 'react-router-dom'


const CategoryProduct = ({id, title, image, specs, features, price, stock}) => {

  const navigate = useNavigate();

  return (
    <article>
        <div className='category-product-title'>
            <Link to={`products/${id}`}> {title} </Link>
        </div>

        <figure>
            <div className='category-product-image-container'>
                <img src={`/assets/${image}`} alt={title} />
            </div>
        </figure>
        <aside>

            {specs.dimensions && (
                <div className='category-product-info-dimensions'>
                <h3>Dimensiones</h3>
                <label>{specs.dimensions}</label>
            </div>
            )}
            
            {/* If the element has capacity on specs, it renders the capacity, if not, just passes 
            if capacity loads any data (returns true), then it renders the div*/}
            {specs.capacity && (
              <div className='category-product-info-capacity'>
                  <h3>Capacidad</h3>
                  <label>{specs.capacity}</label>
                </div>
            )}

            <div className='category-product-info-features'>
                <h3>Características</h3>
                <ul>
                    {features?.map( (f, i) => {
                        return <li key={`feature${i}`}>{f}</li>
                    })}
                </ul>
            </div>   
        </aside>
        
        <aside className='category-product-finance'>
            <div className='category-product-finance-price'>
                {price} COP
            </div>

            <div className='category-product-info-stock'>
                <label>Unidades Disponibles: {stock}</label>
                <label>Envio GRATIS</label>
            </div>

            <div className='category-product-action'>
                <button onClick={() => navigate(`products/${id}`)}>Ver Producto</button>
                <button>Añadir a Carrito</button>
            </div>
        </aside>
    </article>
  )
}

export default CategoryProduct