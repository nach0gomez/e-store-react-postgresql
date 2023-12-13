import React, { useContext } from 'react';
import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/cartContext';
import axios from 'axios';

const Checkout = () => {
    const [form, setForm] = React.useState({
        nombre: '',
        documento: '',
        email: '',
        telefono: '',
        direccion: '',
        direccionEnvio: '',

    });

    const initialState = {
        nombre: '',
        documento: '',
        email: '',
        telefono: '',
        direccion: '',
        direccionEnvio: '',
        copiarDireccion: false,
    }

    const { getItems, clearCart } = useContext(CartContext);

    const cartItems = getItems();


    const renderTotal = () => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return total;
      };

    const navigate = useNavigate();

    const handleChange = (ev) => {
        const { name, value, type, checked } = ev.target;

        setForm((prevState) => {
            return {
                ...prevState,
                [name]: type === 'checkbox' ? checked : value,
            };
        });
    };

    const handleCopyAddress = () => {
        if (form.copiarDireccion) {
            setForm((prevState) => {
                return {
                    ...prevState,
                    direccionEnvio: prevState.direccion,
                };
            });
        }
    };


    const isValidEmail = (email) => {
        // Expresión regular para validar un correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const isValidNumber = (number) => {
        // Expresión regular para validar un número (solo dígitos)
        const numberRegex = /^[0-9]+$/;
        return numberRegex.test(number);
    };

    // request a base de datos mysqlite
    const handleSubmit = async () => {
        try {

        // Validar los datos antes de enviar la solicitud
        if (!isValidEmail(form.email)) {
            alert('Correo electrónico no válido');
            console.log('Correo electrónico no válido');
            return;
        }

        if (!isValidNumber(form.documento)) {
            alert('Número de documento no válido');
            console.error('Número de documento no válido');
            return;
        }

        if (!isValidNumber(form.telefono)) {
            alert('Número de teléfono no válido');
            console.error('Número de teléfono no válido');
            return;
        }
            
            const datos = {
                nombre: form.nombre,
                documento: form.documento,
                email: form.email,
                telefono: form.telefono,
                direccion: form.direccion,
                direccionEnvio: form.direccionEnvio,
                valorTotal: renderTotal()
            };
    
            console.log(datos);
    
            // Realiza una solicitud POST para guardar los datos en la base de datos
            const response = await axios.post('http://localhost:3004/guardar', datos);
    
            if (response.status === 200) {
                console.log('Datos guardados correctamente');
                
                //clear the cart so the items are empty
                clearCart();
                
                // Después de enviar el formulario, restablece el estado del formulario a los valores iniciales
                setForm(initialState);


                navigate('/orderconfirmation'); // Redirige a la página de confirmación
            } else {
                console.error('Error al guardar los datos 1:', response.statusText);
            }
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error('Error de respuesta:', error.response.data);
                console.error('Código de estado:', error.response.status);
            } else if (error.request) {
                // La solicitud se hizo, pero no se recibió respuesta
                console.error('Error de solicitud:', error.request);
            } else {
                // Algo ocurrió en la configuración de la solicitud que disparó un error
                console.error('Error:', error.message);
            }
        }
    };
    

    return (
        <div className='checkout'>
            <form onSubmit={handleSubmit}>
                <h2 id='titulo'>Formulario de Compra</h2>
                <div className='container'>
                    <div className='column' id='left-column'>
                        <h4>Informacion Personal</h4>
                        <hr className='hrcheckout'></hr>
                        <div className='form-group'>
                            <label className='izq-nombre' htmlFor='nombre'>
                                Nombre Completo
                            </label>
                            <input
                                type='text'
                                id='nombre'
                                name='nombre'
                                onChange={handleChange}
                                placeholder='Ingrese Nombre Completo *'
                                required
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label className='izq-nombre' htmlFor='documento'>
                                Numero Documento
                            </label>
                            <input
                                type='tel'
                                id='documento'
                                name='documento'
                                onChange={handleChange}
                                placeholder='Ingrese Documento *'
                                required
                            ></input>
                        </div>
                        <h4>Informacion Residencial</h4>
                        <hr className='hrcheckout'></hr>
                        <div className='form-group'>
                            <label htmlFor='copy'>Copiar dirección a envío</label>
                            <input
                                type='checkbox'
                                id='copy'
                                name='copiarDireccion'
                                checked={form.copiarDireccion}
                                onChange={handleChange}
                                onClick={handleCopyAddress}
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='direccion'>Dirección de Residencia Completa</label>
                            <input
                                type='text'
                                id='direccion'
                                name='direccion'
                                placeholder='Ingrese Direccion *'
                                required
                                onChange={handleChange}
                                onBlur={handleCopyAddress}
                            ></input>
                        </div>
                        <button className='cancel-button checkout' onClick={() => navigate('/cart')}>
                            Cancelar
                        </button>
                    </div>

                    <div className='column' id='right-column'>
                        <div className='form-group' id='first-item'>
                            <label id='correo' htmlFor='email'>
                                Correo Electrónico
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                onChange={handleChange}
                                placeholder='Ingrese Correo *'
                                required
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label id='tele' htmlFor='telefono'>
                                Teléfono
                            </label>
                            <input
                                type='tel'
                                id='telefono'
                                name='telefono'
                                onChange={handleChange}
                                placeholder='Ingrese Telefono *'
                                required
                            ></input>
                        </div>
                        <div className='form-group direccion-envio'>
                            <label htmlFor='direccion-envio'>Dirección de Envío Completa</label>
                            <input
                                type='text'
                                id='direccion-envio'
                                name='direccionEnvio'
                                onChange={handleChange}
                                placeholder='Ingrese Direccion *'
                                required
                                value={form.direccionEnvio}
                            ></input>
                        </div>
                        <div>
                            <button className='confirm-button' onClick={handleSubmit} type='button'>
                                Confirmar Orden
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
