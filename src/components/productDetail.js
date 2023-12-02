import React from 'react';
import { useParams } from 'react-router-dom';
import { getProductsById } from '../fetcher';
import '../styles/productDetail.css';

const ProductDetail = () => {

  const [product, setProduct] = React.useState({errorMessage: "", data: {} });
  //const [categories, setCategories] = React.useState({errorMessage: "", data: []}); 

  const {productId} = useParams();
  
  //params product id in the dependency so its executed when productId is loaded
  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductsById(productId);
  
      // Log the original and updated image paths
      //console.log('Before setting state - Original image path:', responseObject.data.image);
  
      setProduct(responseObject);
  
      // Log the image path after setting state
      //console.log('After setting state - Updated image path:', responseObject.data.image);
    };
  
    fetchData();
  }, [productId])

  return (
    <article>
        <div className='category-product-title'>
            {product.data.title}
        </div>

        <figure>
            <div className='category-product-image-container'>
              {/* make sure to load the images from the public reference to avoid the program to not find the file*/}
                <img src={`${process.env.PUBLIC_URL}/${product.data.image}`} alt={product.data.title} />
            </div>
        </figure>
        <aside>
        {product.data.specs && (
          <>
            {product.data.specs.dimensions && (
                <div className='category-product-info-dimensions'>
                <h3>Dimensiones</h3>
                <label>{product.data.specs.dimensions}</label>
            </div>
            )}
            
            {/* If the element has capacity on specs, it renders the capacity, if not, just passes 
            if capacity loads any data (returns true), then it renders the div*/}
            {product.data.specs.capacity && (
              <div className='category-product-info-capacity'>
                  <h3>Capacidad</h3>
                  <label>{product.data.specs.capacity}</label>
                </div>
            )}
          </>
        )}

            <div className='category-product-info-features'>
                <h3>Características</h3>
                <ul>
                    {product.data.features?.map( (f, i) => {
                        return <li key={`feature${i}`}>{f}</li>
                    })}
                </ul>
            </div>   
        </aside>
        
        <aside className='category-product-finance'>
            <div className='category-product-finance-price'>
                {product.data.price} COP
            </div>

            <div className='category-product-info-stock'>
                <label>Unidades Disponibles: {product.data.stock}</label>
                <label>Envio GRATIS</label>
            </div>

            <div className='category-product-action'>
                <button>Añadir a Carrito</button>
            </div>
        </aside>
        <div className='product-info-description'>{product.data?.description}</div>
    </article>
  )
}

export default ProductDetail