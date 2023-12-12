import React from 'react';
import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';

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

    const handleSubmit = (ev) => {
        ev.preventDefault();
        navigate('/orderconfirmation');
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
                            <button className='confirm-button' type='submit'>
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
