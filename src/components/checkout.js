import React from 'react';
import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const [form, setForm] = React.useState({
        nombre: '',
        documento: '',
        email: '',
        telefono: '',
        direccion: '',
        direccionEnvio: '',
        copiarDireccion: false,
    });

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


    // request a base de datos mysqlite
    const handleSubmit = async () => {
        try {
            console.log(form);
            // Realiza una solicitud POST para guardar los datos en la base de datos
            const response = await axios.post('http://localhost:3004/guardar', form, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Datos guardados correctamente');
                navigate('/orderconfirmation'); // Redirige a la página de confirmación
            } else {
                console.error('Error al guardar los datos:', response.statusText);
            }
            // Redirige a la página de confirmación o realiza otras acciones según sea necesario
            //navigate('/orderconfirmation');
        } catch (error) {
            console.error('Error al guardar los datos:', error.message);
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
