import React from 'react';
import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();

    const confirmOrder = (ev) => {
        navigate('/orderconfirmation')
    }
  return (
    <body className='checkout'>
    <h2 id="titulo">Formulario de Compra</h2>
    <div class="container">
    
    <div class="column" id="left-column">
        <h4>Informacion Personal</h4>
        <hr className='hrcheckout'></hr>
        <form>
            <div class="form-group">
                <label class="izq-nombre"  for="nombre">Nombre Completo</label>
                <input  type="text" id="nombre" name="nombre" required></input>
            </div>
        </form>
        <h4>Informacion Residencial</h4>
        <hr className='hrcheckout'></hr>
        <form>
            <div class="form-group">
                <label for="copy">Copiar dirección a envío</label>
                <input type="checkbox" id="copy" name="copy"></input>
            </div>
            <div class="form-group">
                <label  for="direccion">Dirección de Residencia Completa</label>
                <input  type="text" id="direccion" name="direccion" required></input>
            </div>
        </form>
        <button class="cancel-button checkout" onClick={ () => navigate('/cart')}>Cancelar</button>

    </div>

    <div class="column" id="right-column">
    <div class="form-group" id="first-item">
            <label id="correo"  for="email">Correo Electrónico</label>
            <input type="email" id="email" name="email" required></input>
        </div>
        <div class="form-group direccion-envio">
            <label  for="direccion-envio">Dirección de Envío Completa</label>
            <input  type="text" id="direccion-envio" name="direccion-envio" required></input>
        </div>

        <div>
            <button class="confirm-button" onClick={confirmOrder} type="submit">Confirmar Orden</button>
        </div>
        
        

    </div>
        

    
</div>
</body>
  )
}

export default Checkout