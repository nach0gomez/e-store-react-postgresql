import React from 'react'

const CategoryProduct = ({title, image, specs, features, price, stock}) => {
  return (
    <article>
        <div className='category-product-title'>
            {title}
        </div>

        <figure>
            <div className='category-product-image-container'>
                <img src={`./assets/${image}`} alt={title} />
            </div>
        </figure>
        <aside>
            <div className='category-product-info-dimensions'>
                <h3>Dimensiones</h3>
                <label>{specs.dimensions}</label>
            </div>

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
                    {features?.map( (f) => {
                        return <li>{f}</li>
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
                <button>Ver Producto</button>
                <button>Añadir a Carrito</button>
            </div>
        </aside>
    </article>
  )
}

export default CategoryProduct